import {LineChart} from "../../component/LineChart";
import {Button, Col, Radio, Row, Select, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import apiClient from "../../shared/apiClient";
import {openNotificationWithIcon} from "../../shared/notification";
import {handleError} from "../../shared/handleError";

export const Earning = () => {

    const [dataType, setDataType] = useState("year")
    const [data, setData] = useState([])
    const [totalViews, setTotalViews] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)

    const handleChange = (e) => {
        setDataType(e.target.value)
    }

    const fetchView = () => {
        apiClient(`/get-earnings`).then(r => {
            if(r.data.data) {
                setData(r.data.data)
                let views = 0
                let earning = 0
                r.data.data.map(v => {
                    if(v.category == "views")
                        views += v.total
                    else if (v.category == "earning")
                        earning += v.total
                })
                setTotalViews(views)
                setTotalEarning(earning)
            }
        }).catch(e => openNotificationWithIcon("error",handleError(e)))
    }

    useEffect(fetchView,[])

    return (
        <div>
            <Typography.Title level={3}>Earnings Dashboard</Typography.Title>
            <h3 className="chevron-heading">Statistics for the last 30 days</h3>
            {/*<div>*/}
            {/*    <Select defaultValue="all" style={{ width: 200 }}>*/}
            {/*        <Select.Option value="all">All product</Select.Option>*/}
            {/*    </Select>*/}
            {/*</div>*/}
            {/*<div style={{marginTop: "10px"}}>*/}
            {/*    <Radio.Group value={dataType} onChange={handleChange}>*/}
            {/*        <Radio.Button value="year">Year</Radio.Button>*/}
            {/*        <Radio.Button value="month">Month</Radio.Button>*/}
            {/*        <Radio.Button value="daily">Daily</Radio.Button>*/}
            {/*    </Radio.Group>*/}
            {/*</div>*/}
             <Row style={{marginTop: "20px"}}>
                 <Col xs={24} lg={6} md={6}>
                     <div className="earnings-statistics-text">
                         <div className="earnings-statistics-legend">
                             <div className="earnings-graph-name">
                                 <span className="square square-blue" />Product views
                             </div>
                             <div className="earnings-graph-total">
                                 {totalViews}
                             </div>
                         </div>
                         <div className="earnings-statistics-legend">
                             <div className="earnings-graph-name">
                                 <span className="square square-red" />Sales
                             </div>
                             <div className="earnings-graph-total">
                                 0
                             </div>
                         </div>
                         <div className="earnings-revenue">
                             Last 30 days<br />
                             revenue
                             <div className="earnings-revenue-total">
                                 $0 </div>
                         </div>
                         <div className="earnings-full-report-link">
                             <a href="#full-report">View full reports</a>
                         </div>
                     </div>
                 </Col>
                 <Col xs={24} lg={18} md={18}>
                    <LineChart xField={"date"} yField={"views"} data={data}/>
                 </Col>
                 <Col xs={24} lg={24} md={24} style={{ marginTop: '20px' }}>
                     <Typography.Title style={{ textTransform: 'uppercase', textAlign: 'center' }} level={2}>How can I make more sales?</Typography.Title>
                     <div className="earnings-step-block">
                         <div className="earnings-step-number">1</div>
                         <h3>Share your products on social media to increase your views!</h3>

                         <div className="earnings-step-text">
                             Are you active on social media? You can post at least once a day on each social network.
                             Post your most
                             successful products but don't neglect sharing other products as well, you can never know
                             when someone will
                             see an item that is interesting for them!
                         </div>
                     </div>
                     <h3 className="earnings-bold-headline">Click on the social media icons to instantly share your
                         products</h3>
                     <div className="earnings-sharing-list" id="earnings-sharing-list">
                         <div className="earnings-sharing-product-box">
                             <div className="earnings-sharing-product-title">
                                 Angry Bull 2021
                             </div>
                             <div className="img-contain">
                                 <img className="attachment-thumbnail wh" alt=""
                                      src="https://www.sellmyapp.com/wp-content/uploads/thumbnail_image6115ee7ad849a.png"
                                      style={{ marginLeft: '0px', marginTop: '0px' }} />
                             </div>
                             <div className="earnings-sharing-icons">
                                 <a target="_blank"
                                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-facebook.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared&amp;source=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F&amp;title=Check+out+my+latest+app+Angry+Bull+2021.+now+available+for+sale+on+sellmyapp.com.+https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-linkedin.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="https://plus.google.com/share?url=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-gplus.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared&amp;text=Check+out+my+app+Angry+Bull+2021+on+%40sellmyappnow+https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fangry-bull-2021%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-twitter.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                             </div>
                         </div>
                         <div className="earnings-sharing-product-box">
                             <div className="earnings-sharing-product-title">
                                 Hungry Zombie 2020
                             </div>
                             <div className="img-contain">
                                 <img className="attachment-thumbnail wh" alt=""
                                      src="https://www.sellmyapp.com/wp-content/uploads/thumbnail_image5f949bedcf119.png"
                                      style={{ marginLeft: '0px', marginTop: '0px' }} />
                             </div>
                             <div className="earnings-sharing-icons">
                                 <a target="_blank"
                                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-facebook.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared&amp;source=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F&amp;title=Check+out+my+latest+app+Hungry+Zombie+2020.+now+available+for+sale+on+sellmyapp.com.+https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-linkedin.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="https://plus.google.com/share?url=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-gplus.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                                 <a target="_blank"
                                    href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared&amp;text=Check+out+my+app+Hungry+Zombie+2020+on+%40sellmyappnow+https%3A%2F%2Fwww.sellmyapp.com%2Fdownloads%2Fhungry-zombie-2020%2F%3Futm_source%3Ddevshared%26utm_medium%3Dsocialmedia%26utm_campaign%3Ddevshared">
                                     <img
                                       src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/sharing-twitter.jpg"
                                       alt="" width="29" height="29" />
                                 </a>
                             </div>
                         </div>
                         <div className="clearfix" />
                         <div className="earnings-pagination">
                             <a href="#" className="earnings-pagination-link current" data-page="1">1</a>
                         </div>
                     </div>
                     <div className="earnings-step-block">
                         <div className="earnings-step-number">2</div>
                         <h3>Write a blog post on your blog and let people know<br />
                             about your listings</h3>

                         <Row className="earnings-step-text" gutter={20}>
                             <Col lg={12} xs={24}>
                                 <img className="pull-left"
                                      src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-blog-post.jpg"
                                      alt="" width="532" height="364" />
                             </Col>
                             <Col lg={12} xs={24}>
                                 <ol className="earnings-step-2-list">
                                     <li>
                                         Do you have a blog or a personal website? Post about your products on your blog
                                         and let people know
                                         about your listings on FindMeApps.
                                     </li>
                                     <li>
                                         If you have a mailing list you can include referrals to your products in your
                                         newsletter.
                                     </li>
                                 </ol>
                             </Col>
                         </Row>
                     </div>
                     <h3 className="chevron-heading">Use these quick product links below to save time:</h3>
                     <div className="earnings-short-link-list" id="earnings-short-link-list">
                         <div className="earnings-short-link-product-box">
                             <div className="img-contain">
                                 <img className="attachment-thumbnail wh" alt=""
                                      src="https://www.sellmyapp.com/wp-content/uploads/thumbnail_image6115ee7ad849a.png" />
                             </div>
                             <div className="earnings-short-link-main-block">
                                 <div className="earnings-short-link-product-title">
                                     Angry Bull 2021
                                 </div>
                                 <div className="earnings-short-link-field">
                                     <div className="url-text">URL</div>
                                     <input readOnly="readonly" className="url-input" type="text"
                                            value="https://www.sellmyapp.com/downloads/angry-bull-2021/?utm_source=devshared&amp;utm_medium=socialmedia&amp;utm_campaign=devshared" />
                                         <a href="#" className="copy-button">Copy</a>
                                 </div>
                             </div>
                         </div>
                         <div className="earnings-short-link-product-box">
                             <div className="img-contain">
                                 <img className="attachment-thumbnail wh" alt=""
                                      src="https://www.sellmyapp.com/wp-content/uploads/thumbnail_image5f949bedcf119.png" />
                             </div>
                             <div className="earnings-short-link-main-block">
                                 <div className="earnings-short-link-product-title">
                                     Hungry Zombie 2020
                                 </div>
                                 <div className="earnings-short-link-field">
                                     <div className="url-text">URL</div>
                                     <input readOnly="readonly" className="url-input" type="text"
                                            value="https://www.sellmyapp.com/downloads/hungry-zombie-2020/?utm_source=devshared&amp;utm_medium=socialmedia&amp;utm_campaign=devshared" />
                                         <a href="#" className="copy-button">Copy</a>
                                 </div>
                             </div>
                         </div>
                         <div className="clearfix" />
                         <div className="earnings-pagination">
                             <a href="#" className="earnings-pagination-link current" data-page="1">1</a>
                         </div>
                     </div>
                     <div className="earnings-step-block">
                         <div className="earnings-step-number">3</div>
                         <h3>Are you active on any developer forums?</h3>

                         <div className="earnings-step-text">
                             You can contribute wherever it is relevant and suggest source code &amp; tutorials in a
                             discussion.
                         </div>t
                     </div>
                     <div className="earnings-important">
                         <p className="important">Important</p>
                         <p>Please respect the communities you participate in.</p>
                         <p>Don't spam forums in attempts to make more sales.<br />This activity is not tolerated by community moderators.</p>
                     </div>
                     <h3 className="chevron-heading">Examples for popular developer forums:</h3>
                     <div className="earnings-forums-examples">
                         <a target="_blank" href="http://forums.androidcentral.com/">
                             <img
                               src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/android-central-logo.png"
                               alt="" />
                         </a>
                         <a target="_blank" href="http://forums.toucharcade.com/">
                             <img
                               src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/toucharcade-logo.png"
                               alt="" width="150" />
                         </a>
                         <a target="_blank" href="http://www.raywenderlich.com/forums/">
                             <img
                               src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/raywenderlich-logo.png"
                               alt="" />
                         </a>
                         <a target="_blank" href="https://www.scirra.com/forum/">
                             <img src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/scirra-logo.png"
                                  alt="" />
                         </a>
                         <a target="_blank" href="http://forums.makingmoneywithandroid.com/">
                             <img
                               src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/making-money-with-android-logo.jpg"
                               alt="" />
                         </a>
                         <a target="_blank" href="http://forums.devshed.com/">
                             <img src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/devshed-logo.png"
                                  alt="" />
                         </a>
                     </div>
                     <p>You can also let people know about your source codes on any other forum that you are active on.</p>
                     <p>This works only if you are a real contributor and your source code is really relevant for the discussion.<br />
                         Do not do it in a forceful way, it won't work.</p>
                     <div className="earnings-step-block">
                         <div className="earnings-step-number">4</div>
                         <h3>Write a tutorial for our community to read</h3>

                         <Row className="earnings-step-text">
                             <p>Many potential buyers get inspired at first by a personal connection with a developer.
                                 By writing a
                                 tutorial about any subject you are good at (for example: Swift, Android, ASO, App
                                 marketing etc.) You
                                 can get more exposure to potential buyers.</p>
                             <Col lg={12} xs={24}>
                                 <ol className="earnings-step-4-list">
                                     <li>
                                         Your tutorial will be seen on your author
                                         page.
                                     </li>
                                     <li>
                                         Tutorials that are rich with useful information
                                         will be promoted on our home page.
                                     </li>
                                     <li>
                                         Your tutorials contain thumb images and links to your products which send more
                                         views to your
                                         products!
                                     </li>
                                     <li>
                                         If your tutorial is good and original it might also rank in Google and send more
                                         traffic to you and
                                         your items.
                                     </li>
                                 </ol>
                             </Col>
                             <Col lg={12} xs={24}>
                                 <img className="pull-left earnings-step-4-image"
                                      src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-tutorial-image.jpg"
                                      alt="" width="362" height="383" />
                             </Col>
                         </Row>
                     </div>
                     <div className="earnings-step-block">
                         <div className="earnings-step-number">5</div>
                         <h3>Got an interesting story? Want to share it with our readers?</h3>

                         <div className="earnings-step-text">
                             The community always wants to hear about how other mobile developers are doing. By sharing
                             your story you
                             can get featured on our blog. The posts are published on social media and on our
                             newsletter. Many authors
                             that have participated in our indie dev spotlight enjoy increased traffic to their product
                             pages.
                         </div>
                     </div>
                     <h3 className="chevron-heading">We are open to hear any idea you have including:</h3>
                     <Row className="earnings-ideas">
                         <Col md={6} sm={12} className="earnings-idea">
                             <img alt=""
                                  src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-interview-icon.png" />

                                 <p>A personal written interview with you.</p>
                         </Col>
                         <Col md={6} sm={12} className="earnings-idea">
                             <img alt=""
                                  src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-podcast-icon.png" />

                                 <p>Making a PODCAST together.</p>
                         </Col>
                         <Col md={6} sm={12} className="earnings-idea">
                             <img alt=""
                                  src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-study-icon.png" />

                                 <p>Publishing a case study.</p>
                         </Col>
                         <Col md={6} sm={12} className="earnings-idea">
                             <img alt=""
                                  src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-share-icon.png" />

                                 <p>Sharing a success story.</p>
                         </Col>
                         <Col md={6} sm={12} className="earnings-idea">
                             <img alt=""
                                  src="https://www.sellmyapp.com/wp-content/plugins/edd-fes/assets/img/earnings-idea-icon.png" />

                                 <p>Any other cool idea you have.</p>
                         </Col>
                     </Row>
                     <div className="earnings-button-block">
                         <Button className="btn btn-lg btn-earnings" id="earnings-idea-create-thread" href="#">Tell us about
                             your idea</Button>
                     </div>
                     <div className="earnings-separator" />
                     <div id="full-report" className="link-anchor" />
                     <h2 className="earnings-heading">Commissions overview</h2>
                     <div className="earnings-commissions-overview">
                         <div className="earnings-commissions paid">
                             Paid commissions
                             <div className="earnings-revenue-total">
                                 $0.00 </div>
                         </div>
                         <div className="earnings-commissions unpaid">
                             Unpaid commissions
                             <div className="earnings-revenue-total">
                                 $0.00 </div>
                         </div>
                         <div className="earnings-commissions revoked">
                             Revoked commissions
                             <div className="earnings-revenue-total">
                                 $0.00 </div>
                         </div>
                     </div>
                     <h2 className="earnings-heading">Full earnings report</h2>
                     <p>You haven't made any sales yet!</p>
                 </Col>
            </Row>
        </div>
    );
}
