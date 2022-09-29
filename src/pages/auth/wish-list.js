// Sumair editing in src => pages => auth => wish-list.js
import {Button, Image, Skeleton, Space, Table, Typography} from "antd";
import {Link} from "react-router-dom";
import {CloseOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import apiClient from "../../shared/apiClient";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css'
import { Card } from "antd";

export const WishList = () => {

        const [breadCrumbName,setBreadCrumbName] = useState('')
        const [wishList, setWishList] = useState()
        const [loading, setLoading] = useState(true)
        const [id, setID] = useState()

        const getWishList = () => {
            apiClient('wishlist').then(r => {
                setLoading(false)
                if (r.data) {
                    let data = r.data.data
                    if (data.length > 0) {
                        setID(data[0].id)
                        setWishList(data[0]?.product)
                    }
                }
            }).catch(e => {
                setLoading(false)
                if(!handleError(e)?.status) {
                    openNotificationWithIcon("error", handleError(e).errMess)
                }
            })
        }


        const deleteWishList = products => {
            setLoading(true)
            apiClient.delete(`wishlist/${id}`, {
                params: products
            }).then(r => {
                setLoading(false)
                if (r.data) {
                    let data = r.data.data
                    if (data.length > 0) {
                        setWishList(data[0]?.product)
                    } else setWishList([])
                    openNotificationWithIcon("success", r.data.message)
                }
            }).catch(e => {
                setLoading(false)
                if(!handleError(e)?.status) {
                    openNotificationWithIcon("error", handleError(e).errMess)
                }
            })
            console.log(products, id)
        }

        useEffect(getWishList, [])

        useEffect(() => {
            let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
            setBreadCrumbName(url.toUpperCase())
        },[])

        const columns = [
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: (val, r) => (<Image src={r.thumbnail_image.url} width="100px" height="70px" />)
            },
            {
                title: 'Name',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                render: (v, r) => r.product_category.name
            },
            {
                title: 'Single app license price',
                dataIndex: 'single_app_license',
                key: 'single_app_license',
                render: (v, r) => "$"+r.single_app_license
            },
            {
                title: '',
                dataIndex: 'empty',
                key: 'empty',
                render: (v, r) => (<Space>
                    <Link to={`/product-detail/${r.id}`}>
                        <Button type="primary">View Product</Button>
                    </Link>
                    <Button icon={<CloseOutlined />} onClick={() => deleteWishList(r)}></Button>
                </Space>)
            },

        ]

        return (<>
            <div className="barCustomStyle" style={{marginBottom: "25px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
            <span style={{float: "right"}}>
                <Link to={"/"}>Continue shopping</Link>
            </span>
            <div className="site-card-border-less-wrapper" style={{width: "750px", margin: "auto"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <Skeleton active loading={loading}>
                        <Table columns={columns} dataSource={wishList} />
                    </Skeleton>
                </Card>
            </div>
            
        </>)
}