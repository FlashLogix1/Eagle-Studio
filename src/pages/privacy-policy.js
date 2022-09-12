// Sumair editing in src => pages => privacy-policy.js
import {Card, Col, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import apiClient from "../shared/apiClient";
import {openNotificationWithIcon} from "../shared/notification";
import {handleError} from "../shared/handleError";
import '../../src/CustomStyles.css'

export const PrivacyPolicy = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [privacy, setPrivacy] = useState()

    const getData = () => {
        apiClient(`privacyPolicy`).then(r => setPrivacy(r.data.data)).catch(e => openNotificationWithIcon("error", handleError(e).errMess))
    }

    useEffect(getData, [])

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return( <Row gutter={[20, 10]} >
        <Col xs={24} sm={24} md={18} lg={20} xl={20}>
            <div className="barCustomStyle">
                <AppBreadcrumb name={breadCrumbName} />
            </div>
            {/* <Typography style={{marginTop: '15px', marginBottom: '15px', fontSize: '25px'}}>{breadCrumbName}</Typography> */}
            <div className="site-card-border-less-wrapper" style={{marginTop: "20px"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <div dangerouslySetInnerHTML={{__html: privacy?.policy}}></div>
                </Card>
            </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={4} xl={4}>
            <Row gutter={[5, 5]} justify="center" align="middle" style={{ marginLeft: "75.5px" }}>
                <Card title="Contact Us" style={{ width: 400 }}>
                    <span style={{color: "#2bc246"}}>sales@findmeapp.com</span>
                </Card>
            </Row>
        </Col>
    </Row>)
}