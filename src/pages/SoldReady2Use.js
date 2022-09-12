// Sumair editing in src => pages => SoldReady2Use.js
import {useEffect, useState} from "react";
import {getData, getDataByPost} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";
import {Col, Empty, Pagination, Row, Skeleton, Typography} from "antd";
import {AppProductCard} from "../component/AppProductCard";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import '../../src/CustomStyles.css'
import { Card } from "antd";


export const SoldReady2Use = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    // useEffect(() => {
    //     setLoading(true)
    //     getData(`get-template/product?urn=${window.location.pathname.replace(/\\|\//g,'') }`).then(r => {
    //         setProducts(r.data.data)
    //         setLoading(false)
    //     }).catch(err => {
    //         setLoading(false)
    //         openNotificationWithIcon("error", handleError(err))
    //     })
    // },[])

    const nextPage = page => {
        getData(`get-template/product?urn=${window.location.pathname.replace(/\\|\//g,'')}&page=${page}`).then(r => {
            setProducts(r.data.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            openNotificationWithIcon("error", handleError(err))
        })
    }


    // return (<div>
    //     <Typography.Title type="secondary" level={2}>Sold</Typography.Title>
    //     <Row gutter={[25, 20]} justify={"center"}>
    //         <Col>
    //             <Row gutter={[15, 5]}>
    //                 <Skeleton active loading={loading} paragraph={{ rows: 15 }} avatar shape="round">
    //                     {products && products?.data && products?.data?.map(v => <Col key={v.id}>
    //                             <AppProductCard product={v} id={v.id} />
    //                         </Col>
    //                     )}
    //                 </Skeleton>
    //             </Row>
    //             { (products?.data?.length > 0 ) ? <Pagination defaultCurrent={1} total={products?.total ? products?.total : 0} defaultPageSize={48}
    //                                                           onChange={nextPage}/> : !loading && <Empty />}
    //         </Col>
    //
    //     </Row>
    // </div>)

    return (
        <div>
            <div className="barCustomStyle">
                <AppBreadcrumb name={breadCrumbName} />
            </div>
            
            <div className="site-card-border-less-wrapper" style={{marginTop: "20px"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <Typography.Title type="secondary" style={{fontSize: "20px"}}>Coming Soon...</Typography.Title>
                </Card>
            </div>
            
        </div>
    )
}