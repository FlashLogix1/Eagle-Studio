// Sumair editing in src => pages => auth => products.js
import {Button, Image, Popconfirm, Skeleton, Space, Table, Tabs, Tag, Typography, Card} from "antd";
import {CloseCircleTwoTone, CloseOutlined, EditOutlined, EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {deleteData, getData, postData} from "../../actions/common";
import {Link} from "react-router-dom";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';


    const tab = [
        {
            tab: 'Draft',
            key: 'draft'
        },
        {
            tab: 'Pending',
            key: 'pending'
        },
        {
            tab: 'Reject',
            key: 'reject'
        },
        {
            tab: 'Live',
            key: 'live'
        },
        {
            tab: 'All',
            key: 'all'
        },
    ]



export const Products = () => {

    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [breadCrumbName,setBreadCrumbName] = useState('')

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => ( <Image src={record?.thumbnail_image?.url} width='120px' height='70px'/>)
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (<div>
                {record.status == 0 ? <Tag color="volcano">Draft</Tag> : record.status == 1 ? <Tag color="green">Live</Tag> : record.status == 2 ? <Tag color="red">Reject</Tag> : record.status == 3 ? <Tag color="magenta">Pending</Tag> : ""}
            </div>)
        },
        {
            title: 'Price',
            dataIndex: 'single_app_license',
            key: 'single_app_license',
            render: (text, record) => (<span>${record?.single_app_license} - ${record?.multi_app_license}</span>)
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => (<span>{new Date(record?.updated_at).toLocaleDateString()} <br />Last Modified</span>)
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (<Space>
                    <Button><Link to={`/edit-product/${record.id}`}><EditTwoTone twoToneColor="#2bc246" /></Link></Button>
                    {record.status == 0 ?
                        <Popconfirm title={`Are you sure delete product `} okText="Yes" cancelText="No"
                                    onConfirm={() => deleteProduct(record.id)}>
                            <Button icon={<CloseCircleTwoTone twoToneColor="#ee3658" />}/>
                        </Popconfirm> : <Link to={`/product-detail/${record.id}`}><Button icon={<EyeTwoTone twoToneColor="#2bc246" />} /></Link>
                    }
                </Space>
            )
        },

    ]

    useEffect(() => {
        postData(`/get-products-status`,{status: "draft"}).then(r => {
            setProduct(r.data)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    const deleteProduct = id => {
        setLoading(true)
        deleteData(`/product/${id}`).then(r => {
            setProduct(product.filter(v => v.id != id))
            setLoading(false)
        }).catch(e => {
            console.log(handleError(e))
            setLoading(false)
        })
    }

    const callback = (key) =>
    {
        setLoading(true)
        postData(`/get-products-status`,{status: key}).then(r => {
            setProduct(r.data)
            setLoading(false)
        }).catch(e => {
            openNotificationWithIcon('error', handleError(e))
            setLoading(false)
        })
    }

    return (<>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
        </div>
        {/* <Typography>Products</Typography> */}
        
        <div className="site-card-border-less-wrapper" style={{width: "900px", margin: "auto"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        {
                            tab && tab.map(v =>
                                <Tabs.TabPane tab={v.tab} key={v.key}>
                                <Skeleton loading={loading} active>
                                    <Table columns={columns} dataSource={product} scroll={{ x: 400 }} />
                                </Skeleton>
                                </Tabs.TabPane>
                            )
                        }
                </Tabs>            
                </Card>
        </div>


        
    </>)
}