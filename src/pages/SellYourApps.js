// Sumair editing in src => pages => SellYourApp.js
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import {useEffect, useState} from "react";
import {Button, Col, Image, Row, Typography} from "antd";
import {AppProductCardDemo} from "../component/AppProductCard";
import apiClient from "../shared/apiClient";
import {openNotificationWithIcon} from "../shared/notification";
import {handleError} from "../shared/handleError";
import '../../src/CustomStyles.css'
import { Card } from "antd";

export const SellYourApp = () => {

    const [breadCrumbName,setBreadCrumbName] = useState()
    const [data, setData] = useState()

    const getData = () => {
        apiClient(`sellYourApp`).then(r => setData(r.data.data)).catch(e => openNotificationWithIcon("error", handleError(e).errMess))
    }

    useEffect(getData, [])
    useEffect(() => {
        let url = window.location.pathname.replaceAll(/\//g, "").replaceAll('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return (<div>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
        <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
        </div>
        <div className="site-card-border-less-wrapper" style={{width: "800px", margin: "auto", marginBottom: "60px"}}>
            <Card title={breadCrumbName} bordered={true}>
                <div dangerouslySetInnerHTML={{__html: data?.data}}></div>
            </Card>
        </div>
        {/* <Typography style={{marginTop: '15px', marginBottom: '15px', fontSize: '25px'}}>{breadCrumbName}</Typography> */}
        
    </div>)
}