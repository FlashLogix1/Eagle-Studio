// Sumair editing in src => pages => auth => Dashboard.js

import React, {useState, useEffect} from 'react';
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';
import { Card } from 'antd';
import { FieldTimeOutlined, MailOutlined, CreditCardOutlined, HeartOutlined } from '@ant-design/icons';
import {FaHouseUser, AiOutlineFileSearch} from 'react-icons/all';

const DashboardComponent = () => {
    const [breadCrumbName,setBreadCrumbName] = useState('');

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])
  return (
    <div>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
            
        </div>
        <Card style={{width: "880px", margin: "auto"}}>
            {/* <div style={{marginTop: "30px", marginBottom: "30px", textAlign: "center"}}>
                <div ><FieldTimeOutlined /> $0 Balance</div>
                <div  style={{marginLeft: "25px"}}><AiOutlineFileSearch /> <span>175 Viewer</span></div>
            </div>
            <div style={{marginTop: "70px", marginBottom: "30px", textAlign: "center"}}>
                <span ><MailOutlined /> 0 Unreplied comments</span>
                <span  style={{marginLeft: "25px"}}><FaHouseUser /> 0 Sales Completed</span>
            </div>
            <div style={{marginTop: "70px", marginBottom: "30px", textAlign: "center"}}>
                <span ><CreditCardOutlined /> <span>0 Credit</span></span>
                <span style={{marginLeft: "25px"}}><HeartOutlined />  0 Wish List</span>
            </div> */}
            <div class="grid-container">
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><FieldTimeOutlined /></div>
                        <div style={{flexGrow: "1"}}>$0 <div>Balance</div></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><AiOutlineFileSearch /></div>
                        <div style={{flexGrow: "1"}}>175 <div>Views</div></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><MailOutlined /></div>
                        <div style={{flexGrow: "1"}}>0 <div>Unreplied Comments</div></div>
                    </div>    
                </div>  
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><FaHouseUser /></div>
                        <div style={{flexGrow: "1"}}>0 <div>Sale Completed</div></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><CreditCardOutlined /></div>
                        <div style={{flexGrow: "1"}}>0 <div>Credit</div></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="flex-container">
                        <div style={{fontSize: "50px"}}><HeartOutlined /></div>
                        <div style={{flexGrow: "1"}}>0 <div>Wish List</div></div>
                    </div>
                </div>  
            </div>
        </Card>
    </div>
  )
}

export default DashboardComponent;
