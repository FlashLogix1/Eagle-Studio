// Sumair editing in src => pages => HotDeals.js
import {Button, Card, Col, Input, List, Row, Slider, Tooltip, Typography} from "antd";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import {useEffect, useState} from "react";
import {AppCard} from "../component/AppCard";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {AppList} from "../component/AppList";
import {AppProductCard} from "../component/AppProductCard";
import '../../src/CustomStyles.css'

const productData = [
    {
        id: '1',
        name: 'bilal',
        image: 'https://www.sellmyapp.com/wp-content/uploads/thumbnail_image61108e3bf1214.png',
        price: '$10',
        url: 'https://www.sellmyapp.com/downloads/category/unity/'
    }
]

export const HotDeals = () => {

    const [breadCrumbName, setBreadCrumbName] = useState()
    const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 40))

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

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
                
            {/*{arr && arr.map(v => <Col><AppProductCard /></Col>)}*/}
                
            
        </div>
    )
}