import {Card, Col, Row, Typography} from "antd";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import {useEffect, useState, Fragment} from "react";
import '../../src/CustomStyles.css';


export const SourceCode = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return (
        <Fragment>
            <div className="barCustomStyle">
                <div style={{paddingLeft: "127px"}}>
                    <AppBreadcrumb name={breadCrumbName} />
                </div>
                </div>
            <Row gutter={[10, 10]} style={{padding: "0px 150px", marginBottom: "60px"}}>
                <Col xs={24} sm={24} md={18} lg={20} xl={20}>
                    {/* <Typography style={{marginTop: '15px', marginBottom: '15px', fontSize: '25px'}}>{breadCrumbName}</Typography> */}
                    <div className="site-card-border-less-wrapper" style={{marginTop: "20px"}}>
                        <Card title={breadCrumbName} bordered={true}>
                            <Typography.Text>
                                Are you a mobile app developer? You can gain a lot from joining SellMyApp marketplace. We are a team of experts who work to create the best mobile source codes marketplace system. Our main aim is on the one hand to provide with developers like you the platform to expose their templates to our growing community of buyers, agencies and app portfolio owners in order to make sales easier and faster and create a new income stream for your business.

                                On the other hand our second aim is to assist potential buyers cut down their app launching time, resources and expenses in order to make launching apps faster, easier and much more fun!

                                You will get to monitor your sales using our system which documents them and if needed provide support and answer questions to interested buyers using our intuitive easy to use messaging system in your dashboard.
                            </Typography.Text>
                            <Typography style={{marginTop: '15px', marginBottom: '15px', fontSize: '25px'}}>You can begin selling your codes with a few simple steps</Typography>
                            <Typography.Text>
                                Apply to become a vendor on our marketplace. Please bear in mind that we have many applications and
                                we seriously review each and every one of them so it make take a few days in some cases until you get approved.
                                If you fill all the details in the form on it can help speeding up your account approval process
                            </Typography.Text>
                        </Card>
                    </div>
                    
                </Col>
                <Col xs={24} sm={24} md={6} lg={4} xl={4} style={{marginTop: "20px"}}>
                    <Row gutter={[5, 5]} justify="center" align="middle" style={{marginLeft: "75.5px"}}>
                        <Card title="Contact Us" style={{ width: 400 }}>
                            <span style={{color: "#2bc246"}}>sales@findmeapp.com</span>
                        </Card>
                        {/*<Card title="Buying App Components" style={{ width: 400 }}>*/}
                        {/*    <span>App Source Code</span>*/}
                        {/*    <span>App license types</span>*/}
                        {/*</Card>*/}
                        {/*<Card title="Selling App Components" style={{ width: 400 }}>*/}
                        {/*    <Typography.Text>Sell Your App Source Code</Typography.Text>*/}
                        {/*    <Typography.Text>Preparing your code</Typography.Text>*/}
                        {/*    <Typography.Text>Uploading your Code</Typography.Text>*/}
                        {/*</Card>*/}
                    </Row>
                </Col>
            </Row>
        </Fragment>
        
    )
}