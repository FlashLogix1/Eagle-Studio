import {Card, Col, Row, Typography} from "antd";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import {useEffect, useState} from "react";
import apiClient from "../shared/apiClient";
import {openNotificationWithIcon} from "../shared/notification";
import {handleError} from "../shared/handleError";
import {Link, useLocation} from "react-router-dom";
import '../../src/CustomStyles.css';


export const TermsCondition = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [allData, setAllData] = useState()
    const location = useLocation();

    const getData = () => {
        setLoading(true)
        apiClient(`/termsCondition`).then(r => {
            setLoading(false)
            setAllData(r.data.data)
        }).catch(e => {
            setLoading(false)
            openNotificationWithIcon("error", handleError(e).errMess)
        })
    }

    const getSpecificTerm = type => {
        setLoading(true)
        apiClient.post(`/terms-condition`, {type: type}).then(r => {
            setData(r.data.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            openNotificationWithIcon("error", handleError(e).errMess)
        })
    }

    useEffect(() => {
        let pathName = location.pathname.replaceAll(/\//g, "_").replaceAll("_", " ").toUpperCase()
        setBreadCrumbName(pathName)
        if(pathName == " DEVELOPER TERMS CONDITION")
            getSpecificTerm("developer_terms_condition")
        else if(pathName == " BUYER TERMS CONDITION")
            getSpecificTerm("buyer_terms_condition")
        else if(pathName == " RESKIN TERMS CONDITION")
            getSpecificTerm("reskin_terms_condition")
        else if(pathName == " USER TERMS CONDITION")
            getSpecificTerm("user_terms_condition")
        else if(pathName == " AFFILIATE TERMS CONDITION")
            getSpecificTerm("affiliate_terms_condition")
    }, [location])

    useEffect(getData, [])

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replaceAll('_', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return (<Row gutter={[20, 10]} >
        <Col xs={24} sm={24} md={18} lg={24} xl={24} >
            <div className="barCustomStyle" style={{marginBottom: "25px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
            {/* <Typography style={{marginTop: '15px', marginBottom: '15px', fontSize: '25px'}}>{breadCrumbName}</Typography> */}
            <div className="site-card-border-less-wrapper" style={{width: "700px", margin: "auto"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <div dangerouslySetInnerHTML={{__html: data?.terms_condition}}></div>    
                </Card>
            </div> 
        </Col>

        {/* <Col xs={24} sm={24} md={6} lg={4} xl={6}>
            <Row gutter={[5, 5]} justify="center" align="middle">
                <Card title="Terms and Conditions" loading={loading} style={{marginLeft: "20px"}}>
                    {allData && allData.map(v => <div style={{textTransform: 'capitalize'}}>
                        <Link to={`/${v.type}`} style={{color: v.type ==  window.location.pathname.replace(/\//g, "") ? "#2bc246" : "black"}}>{v.type.replace(/\//g, "").replaceAll('_', ' ')}</Link>
                    </div>)}
                </Card>
            </Row>
        </Col> */}
    </Row>)
}