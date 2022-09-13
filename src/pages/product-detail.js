import {
    Badge,
    Button,
    Card,
    Checkbox,
    Col,
    Spin,
    Divider,
    Form,
    Image,
    List,
    Radio,
    Row, Skeleton,
    Tabs,
    Typography, Grid, Space, Modal, Tag, Select
} from "antd";
import {useContext, useEffect, useMemo, useState} from "react";
import {getData, getDataByID, saveData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {useHistory, useParams} from "react-router";
import Carousel from "react-grid-carousel"
import {ProductPriceCard} from "../component/ProductPriceCard";
import {
    AndroidOutlined, AppleOutlined,
    CreditCardOutlined,
    HeartTwoTone,
    LoadingOutlined,
    PlusCircleOutlined, QuestionCircleTwoTone,
    YoutubeOutlined
} from "@ant-design/icons";
import moneyIcon from '../assets/money-back.png'
import {Link} from "react-router-dom";
import {Comments} from "../component/Comments";
import {Editor} from "../component/CommentEditor";
import TextArea from "antd/es/input/TextArea";
import {openNotificationWithIcon} from "../shared/notification";
import {APIContext} from "../context/context";
import apiClient from "../shared/apiClient";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import '../../src/CustomStyles.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const floatRightStyle = {
    float: 'right',
    fontSize: '16px'
}


export const ProductDetail = () => {

    const {id} = useParams()
    const screens = Grid.useBreakpoint();
    const [cartState, setCartState] = useContext(APIContext)
    const [error, setError] = useState()
    const [product, setProduct] = useState({})
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState()
    const [description, setDescription] = useState()
    const [loading, setLoading] = useState(true)
    const [loadingCart, setLoadingCart] = useState(false)
    const history = useHistory()
    const [form] = Form.useForm()
    let user = true
    

    useEffect(() => {
        if(error)
            openNotificationWithIcon("error", error)
    }, [error])

    useEffect(() => {
        if(cartState && cartState.length > 0){
            let cartSelectedData = cartState[0].product.filter((v => v.id == id))
            if(cartSelectedData[0]?.pivot?.type == "single_app_license")
                form.setFieldsValue({price : cartSelectedData[0]?.pivot.type+"-"+cartSelectedData[0]?.single_app_license+"-"+id})
            else
                form.setFieldsValue({price : cartSelectedData[0]?.pivot?.type+"-"+cartSelectedData[0]?.multi_app_license+"-"+id})
        }
    },[cartState])

    useEffect(() => {
        getDataByID(`/product/${id}`).then(r => {
            if(Object.keys(r.data).length > 0) setProduct(r.data)
            else history.push('/404')
            setLoading(false)
        }).catch(e => {
            setError(handleError(e))
            setLoading(false)
        })
        getData(`/${id}/get-comment`).then(r => {
            setComments(r.data)
            setLoading(false)
        }).catch(e => {
            setError(handleError(e))
            setLoading(false)
        })

    },[])

    const addToCard = (e) => {
        setLoadingCart(true)
        saveData(`/cart`,e).then(r => {
            if(r.data?.status) {
                setCartState(r.data.data)
                openNotificationWithIcon("success", r.data.message)
            } else openNotificationWithIcon("error", r.data?.message)
            setLoadingCart(false)
        }).catch(e => {
            if(handleError(e).errMess !="" && handleError(e).errMess != undefined) {
                openNotificationWithIcon("error", handleError(e).errMess)
            }
            setLoadingCart(false)
        })
    }

    const onSubmit = () => {
        setLoading(true)
        saveData(`${id}/comment`, {comment: comment}).then(r => {
            setComments(r.data)
            setLoading(false)
            setComment('')
        }).catch(e => {
            setError(handleError(e))
            setLoading(false)
        })
    }

    const addWishlist = () => {
        apiClient.post(`wishlist`, {product_id: id}).then(r => {
            if(r.data)
                openNotificationWithIcon('success',r.data.message)
        }).catch(e => {
            if(!handleError(e).status)
                openNotificationWithIcon("error", handleError(e).errMess)
        })
    }

    const reply = (obj, replyComment) => {
        obj = {...obj, comment: replyComment}
        saveData(`${id}/reply-comment`,obj).then(r => {
            setComments(r.data)
            setComment('')
        }).catch(e => setError(handleError(e)))
    }

    const RenderButtons = ({ icon, text, url }) => {
        if(screens.xs) {
            return <Button title={text} type="primary" href={url}>{icon}</Button>
        } else {
            return <Button icon={icon} type="primary" href={url}>{text}</Button>
        }
    }

    return (<div className="ralewayCustomStyle">
        <Skeleton active loading={loading}>
            {/* L.H.S content */}
        <div className="barProductCustomStyle">
            <Row gutter={[130,130]}>
                <Col lg={4} >
                    <img src="/p1.png" width="80" height="80" alt="image1" id="topImage" />
                </Col>
                <Col lg={16}>
                    <h2>Mission Possible | Action</h2>
                    <h6>TOP TRENDING GAME</h6>
                </Col>
            </Row>
        </div>
        {/* <Typography.Title type="secondary" level={2}>{product?.title}</Typography.Title> */}
        <Space>
            
        </Space>
        <Row gutter={[10,10]} style={{marginTop: "-70px", paddingLeft: "28px"}}>
            <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                {/* <Image preview={false} width={"100%"} height={236} src={product?.featured_image?.url} /> */}
                {/* <Row gutter={[10, 10]}>
                    {product && product?.screenshots?.map(v => (<Col style={{margin: '10px 0px'}}><Image width={120} height={94} src={v.url} /></Col>))}
                </Row> */}

                {/* <Space>
                    {product && product.youtube_link && <RenderButtons type="primary" url={product.youtube_link} text="Youtube" icon={<YoutubeOutlined />} />}

                    {product && product.google_play_link && <RenderButtons url={product.google_play_link} icon={<AndroidOutlined />} text="Android" />}

                    {product && product.app_store_link && <RenderButtons url={product.app_store_link} text="iOS" icon={<AppleOutlined />} />}
                    <Button onClick={addWishlist} icon={<HeartTwoTone twoToneColor="#eb2f96" />} type="primary">{screens.xs ? '' : 'Add to wishlist'}</Button>
                </Space> */}
                
                <Tabs defaultActiveKey="1" style={{marginTop: 20}}>
                    <Tabs.TabPane tab="Item" key="1">
                        {/* <div dangerouslySetInnerHTML={{__html: product?.description}}/> */}
                        <div style={{marginTop: "15px"}}>
                            <Row>
                                <img src="/p2.png" alt="image2" className="card-img-top" />
                            </Row>
                            <Row className="card-footer centerCustomStyle">
                                <div className="centerCustomStyle">
                                    <a className="btn btn-success mr-2 rounded btn-view">Live Demo</a>
                                    <a className="btn btn-success mr-2 rounded btn-view">4 Likes</a>
                                    <a className="btn btn-success mr-2 rounded btn-view">Add to wishlist</a>
                                </div>    
                            </Row>
                            <Row style={{marginTop: "20px"}}>
                                <Card title="Screenshots" extra={<img src="/g1.png" height="45px" alt="image3" />}>
                                    <Carousel cols={4} rows={1} gap={10} loop showDots>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img src="/c1.jpg" alt="CarouselImage1" className="screenshot-thumb" />
                                        </Carousel.Item>
                                        </Carousel>
                                </Card>
                            </Row>
                            <Row style={{marginTop: "20px"}}>
                                <Card title="Item Description" extra={<Space></Space>}>
                                    <h3>Description</h3>
                                    <p style={{fontSize: "16px"}}>A casual puzzle in which you have to fall safely. It is deceptively simple, yet profoundly deep. Play through the extensive stages, sharpening your wits as you have fun.</p>
                                    <p style={{wordBreak: "break-all", fontSize: "14px"}}><strong>Download apk : https://drive.google.com/file/d/1kx2W-u-HNEBnR5ulXqQ5OzYHImbtF37M/view?usp=sharing</strong></p>
                                </Card>
                            </Row>
                            <Row style={{marginTop: "20px"}}>
                                <Card title="Features" extra={<Space></Space>} style={{width: "712px"}}>
                                    <h3>Features</h3>
                                    <div className="userDescriptionCustomStyle">
                                        <ul>
                                            <li><strong>Made with unity 2020</strong></li>
                                            <li><strong>50</strong> Levels</li>
                                            <li>Easy to reskin</li>
                                            <li><strong>Easy Level Maker</strong></li>
                                            <li>Admob banner and interstitial ads</li>
                                            <li>Splash screen</li>
                                            <li>Ready to publish</li>
                                        </ul>
                                        <h4 className="heading4CustomStyle">What's inside package?</h4>
                                    </div>
                                    <div className="userDescriptionCustomStyle">
                                        <ul>
                                            <li><strong>Complete unity 2020 source code</strong></li>
                                            <li>Screenshots , Icon and banner png</li>
                                            <li>Easy to reskin</li>
                                            <li>Figma file (contains all the store graphics)</li>
                                            <li>Documentation</li>
                                        </ul>
                                    </div>
                                </Card>
                            </Row>
                        </div>
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane tab="Feature" key="4">
                        <div dangerouslySetInnerHTML={{__html: product?.features}} />
                    </Tabs.TabPane> */}
                    <Tabs.TabPane tab={<Badge offset={[10, null]} count={product && product?.product_rating?.length}>Reviews</Badge>} key="2">
                        <Row gutter={[10,10]}>
                        {product?.product_rating?.map(v =>  <Col><Card size="small" title={<ReactStars
                            count={5}
                            size={24}
                            isHalf={true}
                            value={v.rating}
                            emptyIcon={<i className="far fa-star" />}
                            halfIcon={<i className="fa fa-star-half-alt" />}
                            fullIcon={<i className="fa fa-star" />}
                            activeColor="#ffd700"
                            edit={false} />} extra={<span>{v?.user?.username}</span>} style={{ width: 300 }}>
                                <p>{v.message}</p>
                            </Card>
                        </Col>)}
                        </Row>
                    </Tabs.TabPane>
                    {/*<Badge count={1}>*/}
                    <Tabs.TabPane tab="Support" key="4">
                        <div dangerouslySetInnerHTML={{__html: product?.features}} />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab={<Badge offset={[10, null]} count={comments && comments?.length}>Comments</Badge>} key="3">
                        {comments?.length > 0 &&
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={comments}
                                renderItem={(item) => (
                                    <li>
                                        <Comments item={item} reply={reply} replyComment={false} >
                                            {item.children?.length > 0 && item.children.map(v => <Comments key={v} item={v} reply={reply}  replyComment={true} />  )}
                                        </Comments>
                                    </li>
                                )}
                            />
                        }
                        {user && <Skeleton active loading={loading}>
                        <Form.Item>
                                <TextArea rows={4} onChange={(v) => setComment(v.target.value)}  />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" onClick={() => onSubmit()} type="primary">
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </Skeleton>}
                    </Tabs.TabPane>
                </Tabs>
                
            </Col>
            {/* R.H.S sidebar */}
            <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{marginTop: "100px", paddingRight: "28px", paddingLeft: "10px"}}>
                <Spin indicator={antIcon} spinning={loadingCart}>
                <Form onFinish={addToCard} form={form}>
                    <Card bordered={true} style={{ marginLeft: '10px' }}>
                        <Title product={product} id={id}/>
                    </Card>
                </Form>
                </Spin>
            </Col>
        </Row>
        </Skeleton>
    </div>)
}

const Title = ({product, id}) => {

    const [value, setValue] = useState(product?.single_app_license)
    const [license, setLicense] = useState()
    const handleChange = (e) => setValue(e.target.value.split('-')[1])
    const { Option } = Select;
    const provinceData = ['Single License', 'Multiple License'];

    const getLicenses = () => {
        apiClient(`/license`).then(r => setLicense(r.data.data)).catch(e => openNotificationWithIcon("error", handleError(e)))
    }

    useEffect(() => getLicenses(), [])

    const floatRightStyle = {
        float: 'right',
        fontSize: '16px'
    }

    const showLicense = (type) => {
        license.filter(v => v.key == type).map(v => Modal.info({
            title: type.replaceAll("_", " ").toUpperCase(),
            content: (<div dangerouslySetInnerHTML={{__html: v.value}}></div>),
        }))
    }

    return(<div>
        <div className="selectCustomStyle">
            <Select
            defaultValue={provinceData[0]}
            style={{
            width: 180,
            }}
        >
            {provinceData.map((province) => (
            <Option key={province} style={{fontFamily: "Raleway"}}>{province}</Option>
            ))}
        </Select>
        <span className="spanCustomStyle">$27</span>
        </div>

        <div>
            <ul style={{listStyle: "none"}}>
                <li>We offer support</li>
                <li>Future item updates</li>
                <li>100% Satisfaction guarantee</li>
                <li>Download code immediately after purchase</li>
            </ul>
            <button className="btn btn-success mr-2 rounded btn-view" style={{width: "264px", padding: "8px", fontSize: "20px", fontFamily: "Raleway"}}>Buy Now</button>
            <div style={{backgroundColor: "#f5f5f5"}}>
                coinbase
            </div>
        </div>

        <Card title="Information" style={{marginTop: "20px"}}>
            <table>
                <tbody>
                    <tr>
                        <td>Category</td>
                        <td>Game Templates / Unity</td>
                    </tr>
                    <tr>
                        <td>First Release</td>
                        <td>8 September 2022</td>
                    </tr>
                    <tr>
                        <td>Last updated</td>
                        <td>8 September 2022</td>
                    </tr>
                    <tr>
                        <td>Platforms</td>
                        <td>Unity 2020</td>
                    </tr>
                    <tr>
                        <td>Files included</td>
                        <td>unityproj</td>
                    </tr>
                    <tr>
                        <td>File Size</td>
                        <td>259 MB</td>
                    </tr>
                    <tr>
                        <td>Frameworks</td>
                        <td>Unity</td>
                    </tr>
                </tbody>
            </table>
        </Card>
        
        {/* <Form.Item name="price" rules={[{ required: true, message: 'Please select any one!' }]}>
          <Radio.Group onChange={handleChange} value={value} style={{backgroundColor: '#00000026 !important'}}>
            <Radio value={`single_app_license-${product?.single_app_license}-${id}`}>Single App License</Radio>
            <div style={floatRightStyle}>${product?.single_app_license} <QuestionCircleTwoTone twoToneColor="#2bc246" style={{ fontSize: '18px'}} onClick={()=> showLicense("single_app_license")}/></div><br />
            <Radio value={`multi_app_license-${product?.multi_app_license}-${id}`}>Multiple App License</Radio>
            <div style={floatRightStyle}>${product?.multi_app_license} <QuestionCircleTwoTone twoToneColor="#2bc246" style={{ fontSize: '18px'}} onClick={()=> showLicense("multi_app_license")}/></div><br />            
          </Radio.Group>
        </Form.Item> */}

        {/* <Form.Item>
            <span style={{marginTop: '10px'}}>
                <Checkbox /> Request custom quote:
                <ul>
                    <li>We will provide you a custom Reskin quote price for your project</li>
                </ul>
            </span>
        </Form.Item> */}

        {/* <Divider /> */}

        {/* <Row>
            <Col span={12}>
                <Typography>Summary:</Typography>
            </Col>
            <Col span={12}>
                <Typography style={{float: "right"}}>${value ?? 0}</Typography>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={16}>
                <Button block type="primary" htmlType="submit" icon={<CreditCardOutlined />} size={"large"}>
                    ADD TO CART
                </Button>
            </Col>
        </Row>
        <Row>

        </Row>
        <br />
        <Row>
            <Col span={10}>
                <Image preview={false} src={moneyIcon} height={80} />
            </Col>
            <Col span={14}>
                <Typography style={{float: "right"}}>14 DAYS MONEY BACK GUARANTEE POLICY</Typography>
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col span={16}>
                <Typography>Development Hours :</Typography>
            </Col>
            <Col span={8}>
                <Tag color="geekblue" style={{float: "right"}}>{product?.development_hours} Hours</Tag>
            </Col>
        </Row>

        <Row>
            <Col span={10}>
                <Typography>Category</Typography>
            </Col>
            <Col span={14}>
                {product?.product_subcategory && product?.product_subcategory.map(v => <Tag color="cyan" style={{float: "right"}}>{v.name}</Tag>)}
            </Col>
        </Row>

        <Row>
            <Col span={10}>
                Platforms
            </Col>
            <Col span={14}>
                {product?.operating_systems && product?.operating_systems.map(v => <Col span={24}><Tag color="green" style={{float: "right"}}>{v.name}</Tag></Col>)}
            </Col>
        </Row>

        <Row>
            <Col span={10}>
                Frameworks
            </Col>
            <Col span={14}>
                <Tag color="gold" style={{float: "right"}} >{product?.framework?.name}</Tag>
            </Col>
        </Row>

        <Divider />

        <Row gutter={[20, 0]}>
            <Col>
                <Image preview={false} width={110} heigt={110} src={product?.user?.profile_img ? product?.user?.profile_img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAAAAAAdwx7eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBw0JGhXTatJGAAAC/ElEQVRYw+3Z21biMBQG4L7/OyWltKBWlIMg4AwFRFARqy3WQ9MmU5QZXTOk2TuRu8kdF3zrX7tJupNaYm/D+k9r0flzuAiG/f4wWITP+ffReTxt1yuUkmJQWqm3pzFEV9PZquu+m79H8cPtrjJjmj90Kl/YP3yl88DN6HTk7oDfcTdITeinFi0ZrSd9OvJJGU38SJeOjkrlwj6K9OjEV8ib3IkOzTpKubA7TIOequHNmOLpdQ0QuohdW2NpPgDJhT3gSDr2YDKlXoykR8DQRewRjmbHcPqYoehHBypT6jyi6BlcpnSGoqHz42OOYOi8jaHbOYJmpxj6lCHotIGhGymCZicY+gSTOkMVpJkh6D0+RtHD0F2OoBPUY2wjCpJh6lH0UzM4jdlBqHSD2knfoGRKa09geoGk3RhML7GpEzAdVXG19lMw/aZqm/6id0/s3fO6j6LpHD75xF0FE7qeIGjczjfELHRxA48t7Z8kdHYOjm1PBIoWL9CSkCZD0uAVSQKBpUMbWI8lml67MNpFN8HQ+Sd755bR4gqWeibw9BvkJUb8Vw1aXAMepD0XOnR2pj7cnaZatIiUJyVnJfRo5flOfkRS0qy8aSCHidClRVwvs+2F0KfFvGSWkLPMhM77crkWCxNavEivF+ypMKPFUHZB1GKmdCBLfaX6p5K+lNX6xpi+ltG3xvTt/mhpa2leEGnqhTEtfbNfGtMT2WIcmdJc1kaRnul1bSA9MVXHzIDmYdl1rd2JdGm+HlTLXwXe+FWH5vGFp+4W/HmKpdmq50K6J2Ifz14RNH+eNSvQ/prQo3ECPCax+8EBxRyTCKkN7jMlzdeThkNw56+N7jTnL7yMfrvteqjAX+tycPGQSWgeB76t527rsom+g/74sKMPb6Mf/vz80PRBZ8uWY+puo3vnYf5J88cOeK4BdKcb8i3NJqDVgcCrg+SdZn1z7B/88K6g+Y/vlzc711JYIe5aBWwfrK3RXuRijC3MPSQqds/C3EOi6IYF/v6CHd4vNEnMDvXbQPwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDctMTNUMDk6MjY6MjEtMDQ6MDCHQinlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA3LTEzVDA5OjI2OjIxLTA0OjAw9h+RWQAAAABJRU5ErkJggg=="} />
            </Col>
            <Col>
                <Tag color="green">{product?.user?.username}</Tag>
                <br />
                <Link to={`/user-profile/${product?.user?.id}`}>View portfolio</Link>
            </Col>
        </Row> */}
    </div>
    )
}

