import {Col, Layout, Row, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";


export const Footer = () => {

    const [platform, setPlatForm] = useState([])

    useEffect(() => getData(`product_category`).then(r => setPlatForm(r.data)).catch(e => openNotificationWithIcon('error',handleError(e))),[])

    return(
        <Layout.Footer style={{ padding: '7% 10%' }}>
            <Row gutter={[10, 25]} justify="space-between">
                <Col xl={4} lg={4} md={4} sm={12} xs={24}>
                    <Typography.Title level={4}>Platform</Typography.Title>
                    <Space direction="vertical">
                        {platform.length > 0 && platform.map(v =>
                            <Link to={{
                                pathname: `/platform/${v.name.toLowerCase()}`,
                                query: v
                            }}  style={{color: "#92024A", textDecoration: "none"}}>{v.name}</Link>
                        )}
                    </Space>
                </Col>
                <Col xl={4} lg={4} md={5} sm={12} xs={24}>
                    <Typography.Title level={4}>Navigation</Typography.Title>
                    <Space direction="vertical">
                        <Link to="/sell-your-app" style={{color: "#92024A", textDecoration: "none"}}>Sell your app</Link>
                        <Link to="/sell-your-app" style={{color: "#92024A", textDecoration: "none"}}>How to make an app</Link>
                    </Space>
                </Col>
                <Col xl={4} lg={4} md={5} sm={12} xs={24}>
                    <Typography.Title level={4}>How it works</Typography.Title>
                    <Space direction="vertical">
                        <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Buy iOS apps</Link>
                        <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Buy Android</Link>
                        <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Help & Support</Link>
                    </Space>
                </Col>
                <Col xl={4} lg={4} md={5} sm={12} xs={24}>
                    <Typography.Title level={4}>Our Policy</Typography.Title>
                    <Space direction="vertical">
                        <Link to="/developer_terms_condition" style={{color: "#92024A", textDecoration: "none"}}>Terms & Conditions</Link>
                        <Link to="/privacy-policy" style={{color: "#92024A", textDecoration: "none"}}>Privacy Policy</Link>
                    </Space>
                </Col>
            </Row>
        </Layout.Footer>
    )
}