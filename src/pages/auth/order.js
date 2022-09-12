import {Button, Skeleton, Space, Table, Tag, Tooltip, Typography, Card} from "antd";
import {CloseOutlined, EditOutlined, EyeOutlined, ThunderboltOutlined, ThunderboltTwoTone} from "@ant-design/icons";
import {useEffect, useState} from "react";
import apiClient from "../../shared/apiClient";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {Link} from "react-router-dom";
import {readLS} from "../../shared/LS";
import JsFileDownloader from "js-file-downloader";
// import { Line } from '@ant-design/plots';
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';


const columns = [
    {
        title: '#',
        dataIndex: 'order_id',
        key: 'order_id'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (record.status === 1 && <Tag color="green">Completed</Tag>)
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text, item) => "$"+item.total
    },
    {
        title: 'Customer',
        dataIndex: "name",
        key: "name",
    },
    {
        title: 'View Support Thread',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: '',
        dataIndex: 'edit',
        key: 'edit',
        render: (v, item) => (<Space>
                {/*<Tooltip title="Download"><Button icon={<ThunderboltTwoTone color="green" />} onClick={()=> download(item.product_id)}></Button></Tooltip>*/}
                <Tooltip title="Product Details"><Link to={`/product-detail/${item.product_id}`}><Button icon={<EyeOutlined />}></Button></Link></Tooltip>
            </Space>
        )
    },
]

const download = id => {
    console.log(id)
    new JsFileDownloader({
        url: `${process.env.REACT_APP_BASE_URL}/${id}/file`,
        method: "POST",
        // autoStart: false,
        headers: [
            { name: 'Authorization', value: `Bearer ${readLS('findMeToken')}` }
        ]
    })
    new JsFileDownloader({
        url: `${process.env.REACT_APP_BASE_URL}/product-download/${id}`,
        method: "POST",
        headers: [
            { name: 'Authorization', value: `Bearer ${readLS('findMeToken')}` }
        ],
        contentTypeDetermination: 'full', // must be set to "full" or "signature"
        customFileSignatures: {
            '377ABCAF271C': 'application/zip',
            "1F8B": "application/zip",
            "1F9D": "application/zip",
            "1FA0": "application/zip",
            "425A68": "application/zip",
            "4C5A4950": "application/zip"
        }
    })
}

const getOrders = (setOrder, setError, setLoading) => {
    apiClient('order').then(r => {
        setLoading(false)
        if(r.status){
            setOrder(r.data.data)
        }
    }).catch(e => {
        setLoading(false)
        if(!handleError(e).status)
            openNotificationWithIcon("error", handleError(e).errMess)
    })
}

export const Order = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [orders, setOrders] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => console.log(orders), [orders])
    useEffect(() => getOrders(setOrders, setError, setLoading),[])
    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])



    return (<>
        <div className="barCustomStyle">
            <AppBreadcrumb name={breadCrumbName} />
        </div>
        {/* <Typography>Order</Typography> */}

        <div className="site-card-border-less-wrapper" style={{marginTop: "20px"}}>
            <Card title={breadCrumbName} bordered={true}>
                <Skeleton active loading={loading}>
                    <Table columns={columns} dataSource={orders} scroll={{x: 600}}/>
                </Skeleton>                
            </Card>
        </div>

    </>)
}