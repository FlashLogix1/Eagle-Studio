// Sumair editing in src => component => AppHeader.js
import {
    Badge,
    Button,
    Col,
    Dropdown,
    Grid,
    Image,
    Input,
    Layout,
    List,
    Menu,
    Row,
    Space,
    Tooltip
} from "antd";
import logo from "../assets/findmeapp.png";
import {
    CloseCircleTwoTone,
    LoginOutlined, LogoutOutlined,
    MailOutlined, MenuOutlined,
    MessageOutlined, ProfileOutlined,
    SettingOutlined,
    ShoppingCartOutlined, ShoppingOutlined,
    UserAddOutlined, DollarOutlined, DashboardOutlined, UserOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState, Fragment} from "react";
import { deleteData, getData, userLogout} from "../actions/common";
import {handleError} from "../shared/handleError";
import {useHistory} from "react-router";
import {LoginModal} from "./LoginModal";
import {clearLS, readLS} from "../shared/LS";
import {useDispatch, useSelector} from "react-redux";
import {SignUpModal} from "./SignUpModal";
import {openNotificationWithIcon} from "../shared/notification";
import {APIContext} from "../context/context";


const { useBreakpoint } = Grid

export const AppHeader = ({setLoading}) => {

    const screens = useBreakpoint();
    const [cartState, setCartState] = useContext(APIContext)
    const [visible, setVisible] = useState(false)
    const [visibleSignup, setVisibleSignup] = useState(false)
    const [resetFilter] = useState(false)
    const loginState = useSelector(state => state.UserReducer)
    const becomeSellerState = useSelector(state => state.BecomeSellerReducer)
    const dispatch = useDispatch()
    let history = useHistory()
    // const [loggedInUserName, setLoggedInUserName] = useState('')        // get data from redux

    useEffect(() => {
        if(readLS('id')) {
            getData(`get-become-seller`).then(r => dispatch(({'type': "BECOME_SELLER_SUCCESS", payload: r.data}))).catch(e => console.log(handleError(e)))
            dispatch({type: 'USER_LOADING'})
            getData(`getUser/${readLS('id')}`).then(r => dispatch({'type': 'USER_LOGGED_IN', payload: r.data})).catch(() => logout())
            getData(`cart/${readLS('id')}`).then(r => setCartState(r.data)).catch(e => console.log(e))
        }
    },[])

    useEffect(() => {
        if(loginState.errMess)  openNotificationWithIcon('error', loginState.errMess)
        // if(loginState.message.username == null) setLoggedInUserName('')
        // if(loginState.message.username != null) setLoggedInUserName(loginState.message.username)
    }, [loginState])


    const deleteCartData = (id, productID, price) => {
        deleteData(`cart/${id}?product_id=${productID}&price=${price}`).then(r => {
            if(r.data.status) {
                setCartState(r.data.data)
                openNotificationWithIcon("success", r.data?.message)
            } else {
                openNotificationWithIcon("error", r.data?.message)
            }
        }).catch(e => {
            if(!handleError(e)?.status) {
                openNotificationWithIcon("error", handleError(e).errMess)
            }
        })
    }

    const logout = () => {
        dispatch({type: 'USER_LOADING'})
        setLoading(true)
        userLogout(`logout`).then(r => {
            clearLS()
            setCartState([])
            setLoading(false)
            dispatch({type: 'USER_LOGOUT', payload: r.data})
        }).then(() => history.push('/login')).catch(e => dispatch({type: 'USER_FAILED', payload: handleError(e)}))
        setVisible(false)
        // setLoggedInUserName('')
    }

    const menu = (
        <Menu>
                {cartState?.length > 0 ? <>
                        <Menu.Item icon={<ShoppingCartOutlined />}>
                            Shopping Card
                        </Menu.Item>
                            <Menu.Item style={{width: '340px'}}>
                                    <List
                                        dataSource={cartState.length > 0 && cartState[0]?.product}
                                        footer={<div>Total <span style={{float: 'right'}}>${cartState.map(v => v.price)}</span></div>}
                                        width={400}
                                        renderItem={item => (
                                                <List.Item key={item.id}>
                                                    <Link to="/checkout">
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Image src={item.thumbnail_image?.url} width={65}
                                                                       height={45}
                                                                       preview={false}/>
                                                            }
                                                            title={item.title.substr(0, 30)}
                                                            description={item.type}
                                                        />
                                                    </Link>
                                                    <div>
                                                        <Tooltip title="Delete"><CloseCircleTwoTone
                                                            twoToneColor="#E81919"
                                                            onClick={() => deleteCartData(cartState[0]?.id,item.id, item.pivot.type === "single_app_license" ? item.single_app_license : item.multi_app_license)}/></Tooltip>
                                                        <br/>
                                                        ${item.pivot.type === "single_app_license" ? item.single_app_license : item.multi_app_license}
                                                    </div>
                                                </List.Item>
                                            )}
                                    >
                                    </List>
                            </Menu.Item>
                    </> : <Menu.Item icon={<ShoppingCartOutlined />}>
                    Shopping Card is Empty
                </Menu.Item>
            }
        </Menu>
    );

    const dropdown = (
        <Menu>
            <Menu.Item>
                <Link to={`/user-details/${readLS('id')}`}><ProfileOutlined /> Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <span onClick={() => logout()}><LogoutOutlined /> Logout</span>
            </Menu.Item>
        </Menu>
    );

    return(
        <>
            <LoginModal visible={visible} setCartState={setCartState} setVisible={setVisible} setVisibleSignup={setVisibleSignup} resetFilter={resetFilter} />
            <SignUpModal visible={visibleSignup} setVisibleLogin={setVisible} setVisible={setVisibleSignup} resetFilter={resetFilter} />
            <div style={{ padding: '0% 10%' }}>
                <Row gutter={[0, 30]} style={(screens.xs || screens.sm) && !screens.lg ? { textAlign: 'center' } : {}} justify="center">
                    <Col xs={24} sm={24} lg={8}>
                        <Link to="/">
                            <img src={logo} alt="Find me app logo" />
                        </Link>
                    </Col>
                    <Col xs={24} sm={24} lg={8}>
                        <Space>
                            <Badge offset={[-10, null]} count={cartState?.length > 0 ? cartState[0]?.product?.length : 0}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button size="large" icon={<ShoppingCartOutlined />} />
                                </Dropdown>
                            </Badge>
                            {loginState.LoggedIn ?
                                <>
                                    <Link to="/message"><Button size="large" icon={<MailOutlined/>}/></Link>
                                    <Dropdown overlay={dropdown} placement="bottomLeft" arrow>
                                        <Button size="large" icon={<SettingOutlined />} />
                                    </Dropdown>
                                    <Button size="large" icon={<DollarOutlined />}/>
                            </> : <>
                                    <Tooltip title="Login"><Button size="large" icon={<LoginOutlined />} onClick={() => setVisible(true)} /></Tooltip>
                                    <Tooltip title="Sign-up"><Button size="large" icon={<UserAddOutlined />} onClick={() => setVisibleSignup(true)} /></Tooltip>
                                </>}
                        </Space>
                    </Col>
                    <Col xs={24} lg={8}>
                        <div style={{display: "flex"}}>
                            <Input.Search
                                placeholder="Search"
                                allowClear
                                enterButton
                                size="large"
                                onSearch={(value, event) => history.push(`/search/${value}`)}
                            />
                            {/* {loggedInUserName} */}
                            {/* {
                                loginState.LoggedIn && <Fragment><UserOutlined style={{cursor: "pointer"}}/> abc </Fragment>
                            } */}
                            {/* {
                                console.log(loginState.message.username, 'username')
                            } */}
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Layout.Header className="header" >
                    <Menu theme="dark" mode="horizontal" style={{padding: '0% 6%' }} overflowedIndicator={<span style={{float: "right"}}><MenuOutlined /></span>} >
                        <Menu.Item key="1">
                            <Link to="/game-template">Game Template</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/app-template">App Template</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/app-template">Deposit</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="3">
                            <Link to="/hot-deals">Hot Deals</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/sell-your-app">Sell your app</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="subkey1" title="Ready2Use">
                            <Menu.Item key="5">
                                <Link to="/ready-2-use">Ready2Use</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/sold-ready-2-use">Sold</Link>
                            </Menu.Item>
                        </Menu.SubMenu> */}
                        {/*<Menu.Item key="6">*/}
                        {/*    <Link to={'/sell-your-app'}>Sell Your App</Link>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Layout.Header>
            </div>
            {loginState.LoggedIn && <div style={{ padding: '0 50px' }}>
                <Menu mode="horizontal" style={{padding: '0% 6%' }} overflowedIndicator={<span style={{float: "right"}}><MenuOutlined /></span>} >
                <Menu.Item key="7" icon={<DashboardOutlined />}>
                        <Link to={'/message'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<MessageOutlined />}>
                        <Link to={'/message'}>Messages</Link>
                    </Menu.Item>
                    <Menu.Item key="12" icon={<ShoppingOutlined />}>
                        <Link to='/wish-list'>WishList</Link>
                    </Menu.Item>
                    
                    {/* <Menu.Item key="19" icon={<UserAddOutlined />}>
                        <Link to={`/becomeSeller/${readLS('id')}`}>Become Seller</Link>
                    </Menu.Item> */}
                    {/*<Menu.Item key="13">*/}
                    {/*    <Link to={'/follow-list'}>Follow List</Link>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="14">
                        <Link to={'/products'}>Products</Link>
                    </Menu.Item>
                    <Menu.Item key="15">
                        <Link to={'/add-product'}>Add Product</Link>
                    </Menu.Item>
                    <Menu.Item key="16">
                        <Link to={'/earning'}>Earnings</Link>
                    </Menu.Item>
                    <Menu.Item key="17">
                        <Link to={'/order'}>Order</Link>
                    </Menu.Item>
                    <Menu.Item key="18">
                        <Link to={'/purchases'}>Purchase</Link>
                    </Menu.Item>
                    {/* {becomeSellerState.becomeSeller && <>
                        <Menu.Item key="14">
                            <Link to={'/products'}>Products</Link>
                        </Menu.Item>
                        <Menu.Item key="15">
                            <Link to={'/add-product'}>Add Product</Link>
                        </Menu.Item>
                        <Menu.Item key="16">
                            <Link to={'/earning'}>Earning</Link>
                        </Menu.Item>
                        <Menu.Item key="17">
                            <Link to={'/order'}>Orders</Link>
                        </Menu.Item>
                    </>} */}
                </Menu>
            </div>}
        </>
    )
}