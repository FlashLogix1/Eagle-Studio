import {Col, Layout, Row, Space, Typography, Form, Input, Button} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";
import { FaMapMarkerAlt, FaRegEnvelope, IoLogoSkype, FaFacebookF, GrLinkedinOption, AiOutlineGooglePlus, AiOutlineYoutube, FaPinterest, FaGooglePlusG, ImGooglePlus, AiFillYoutube } from 'react-icons/all';
import '../../src/CustomStyles.css';


export const Footer = () => {

    const [platform, setPlatForm] = useState([])

    useEffect(() => getData(`product_category`).then(r => setPlatForm(r.data)).catch(e => openNotificationWithIcon('error',handleError(e))),[])

    const { Text } = Typography;

    const onFinish = (valuesParam1) =>
    {
        console.log('Received values of the form: ', valuesParam1);
    }


    // return(
    //     <Layout.Footer style={{ padding: '7% 10%' }}>
    //         <Row gutter={[10, 25]} justify="space-between">
    //             <Col xl={4} lg={4} md={4} sm={12} xs={24}>
    //                 <Typography.Title level={4}>Platform</Typography.Title>
    //                 <Space direction="vertical">
    //                     {platform.length > 0 && platform.map(v =>
    //                         <Link to={{
    //                             pathname: `/platform/${v.name.toLowerCase()}`,
    //                             query: v
    //                         }}  style={{color: "#92024A", textDecoration: "none"}}>{v.name}</Link>
    //                     )}
    //                 </Space>
    //             </Col>
    //             <Col xl={4} lg={4} md={5} sm={12} xs={24}>
    //                 <Typography.Title level={4}>Navigation</Typography.Title>
    //                 <Space direction="vertical">
    //                     <Link to="/sell-your-app" style={{color: "#92024A", textDecoration: "none"}}>Sell your app</Link>
    //                     <Link to="/sell-your-app" style={{color: "#92024A", textDecoration: "none"}}>How to make an app</Link>
    //                 </Space>
    //             </Col>
    //             <Col xl={4} lg={4} md={5} sm={12} xs={24}>
    //                 <Typography.Title level={4}>How it works</Typography.Title>
    //                 <Space direction="vertical">
    //                     <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Buy iOS apps</Link>
    //                     <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Buy Android</Link>
    //                     <Link to="/source-code" style={{color: "#92024A", textDecoration: "none"}}>Help & Support</Link>
    //                 </Space>
    //             </Col>
    //             <Col xl={4} lg={4} md={5} sm={12} xs={24}>
    //                 <Typography.Title level={4}>Our Policy</Typography.Title>
    //                 <Space direction="vertical">
    //                     <Link to="/developer_terms_condition" style={{color: "#92024A", textDecoration: "none"}}>Terms & Conditions</Link>
    //                     <Link to="/privacy-policy" style={{color: "#92024A", textDecoration: "none"}}>Privacy Policy</Link>
    //                 </Space>
    //             </Col>
    //         </Row>
    //     </Layout.Footer>
    // )
    // ..............................................................................................
    return (
        <Layout.Footer style={{paddingLeft: "60px", backgroundColor: "#2A2A2A", borderTop: "5px solid #FD8A26", paddingTop: "40px", fontFamily: "Noto Sans"}}>
            <Row>
                <Col lg={4} style={{marginRight: "30px"}}>
                    <img src="/t1.png" style={{marginBottom: "30px"}} />
                    <p style={{color: "#9a9a9a", fontSize: "13px"}}><FaMapMarkerAlt style={{color: "#fd8a26"}} /> : Development Studio : East Asia</p>
                    <p style={{color: "#9a9a9a", fontSize: "13px"}}><FaRegEnvelope style={{color: "#fd8a26"}} /> : <a className="footerCustomStyle3" href="mailto:sales@findmeapp.com">sales@findmeapp.com</a></p>
                    <p style={{color: "#9a9a9a", fontSize: "13px"}}><IoLogoSkype style={{color: "#fd8a26"}} /> : findmeapp</p>
                    <div style={{marginLeft: "-42px"}}>
                        <ul className="footerCustomStyle2">
                            <li><a title="facebook" href="https://www.facebook.com/login/"><FaFacebookF style={{color: "#9A9A9A"}} /></a></li>
                            <li><a title="linkedin" href="https://www.linkedin.com/login"><GrLinkedinOption style={{color: "#9A9A9A"}} /></a></li>
                            <li><a title="google-plus" href="https://www.google.com/"><ImGooglePlus style={{color: "#9A9A9A"}} /></a></li>
                            <li><a title="youtube" href="https://www.youtube.com/"><AiFillYoutube style={{color: "#9A9A9A"}} /></a></li>
                            <li><a title="pinterest" href="https://www.pinterest.com/login/"><FaPinterest style={{color: "#9A9A9A"}} /></a></li>
                        </ul>
                    </div>
                </Col>
                <Col lg={4} style={{marginRight: "30px"}}>
                    <div>
                        <h4 className="widgetTitleCustomStyle" style={{marginRight: "64px"}}>Platforms</h4>
                        <div style={{marginLeft: "-37px"}}>
                            <ul className="footerCustomStyle1">
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Android</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">iOS</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Unity</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                    <h4 className="widgetTitleCustomStyle" style={{marginRight: "108px"}}>Sellers</h4>
                        <div style={{marginLeft: "-37px"}}>
                            <ul className="footerCustomStyle1">
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Seller Benefits</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Seller FAQ’s</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Vendor Guidelines</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </Col>
                <Col lg={4} style={{marginRight: "30px"}}>
                    <div>
                        <h4 className="widgetTitleCustomStyle" style={{marginRight: "66px"}}>The Company</h4>
                        <div style={{marginLeft: "-35px"}}>
                            <ul className="footerCustomStyle1">
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Blog</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">About Us</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Contact Us</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Privacy Policy</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                    <h4 className="widgetTitleCustomStyle" style={{marginRight: "95px"}}>Buyers</h4>
                        <div style={{marginLeft: "-35px"}}>
                            <ul className="footerCustomStyle1">
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Request a Custom Quote</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Buyer Benefits</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Buyer FAQ’s</a></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col lg={4} style={{marginRight: "30px"}}>
                    <div>
                        <h4 className="widgetTitleCustomStyle" style={{marginRight: "77px"}}>Quick Links</h4>
                        <div style={{marginLeft: "-35px"}}>
                            <ul className="footerCustomStyle1">
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Start Building your App today!</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">App Store Optimization Packages</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">How to Make an App</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Sell Your App</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Game Templates</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">App Templates</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Quick Launch App</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Featured Products</a></li>
                                <li><a className="footerCustomStyle3 footerCustomStyle4"  href="i am link">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div>
                        <h4 className="widgetTitleCustomStyle" style={{marginRight: "82px"}}>Newsletter</h4>
                        <p style={{color: "#9a9a9a", fontSize: "14px"}}>Get our special deals, free goodies, ideas and latest news in your inbox.</p>
                        <Form onFinish={onFinish}>
                            <Form.Item>
                                <Text style={{color: "#9a9a9a"}}>Email Address:</Text>
                                <Input rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                    ]}
                                    style={{borderRadius: "20px"}}
                                    placeholder="Your email address"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: "#e7753f", marginTop: "-40px", padding: "5px", height: "40px"}}>Subscribe</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        <h4 className="widgetTitleCustomStyle" style={{marginRight: "82px"}}>Newsletter</h4>
                        <p style={{color: "#9a9a9a", fontSize: "14px"}}>Get our special deals, free goodies, ideas and latest news in your inbox.</p>
                        <div style={{margin: "60px 0px", backgroundColor: "white", padding: "30px", textAlign: "center"}}>
                            <form>
                                <input type="email" placeholder="Email Address" />
                                <button className="footerCustomStyle5">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <p><img src="/images/payment.png" height="25px" /></p>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: "50px"}}>
                <Col lg={24}>
                    <div style={{color: "#9a9a9a", textAlign: "center"}}>
                        &copy; 2018 <a className="footerCustomStyle3" href="i am link">findmeapps.com</a> | All Rights Reserved.
                    </div>
                </Col>
            </Row>
        </Layout.Footer>
    )
}