// Sumair editing in src => App.js
import './theme/font.css'
import './App.less'
import {Home} from "./pages/Home";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import {GameTemplate} from "./pages/GameTemplate";
import {AppHeader} from "./component/AppHeader";
import {AppTemplate} from "./pages/AppTemplate";
import {HotDeals} from "./pages/HotDeals";
import {Ready2Use} from "./pages/Ready2Use";
import {SellYourApp} from "./pages/SellYourApps";
import {WishList} from "./pages/auth/wish-list";
import {FollowList} from "./pages/auth/follow-list";
import {Products} from "./pages/auth/products";
import {AddProduct} from "./pages/auth/add-product";
import {Order} from "./pages/auth/order";
import {Parchase} from "./pages/auth/parchase";
import {Earning} from "./pages/auth/earning";
import {Message} from "./pages/auth/message";
import {EditProductStep2} from "./pages/auth/edit-product-step2";
import {EditProductStep3} from "./pages/auth/edit-product-step3";
import {EditProduct} from "./pages/auth/edit-product";
import {ProductAdded} from "./pages/auth/product-added";
import {ProductDetail} from "./pages/product-detail";
import {useEffect, useState} from "react";
import {Checkout} from "./pages/auth/checkout";
import {Search} from "./pages/search";
import {UserProfile} from "./pages/user-profile";
import {Login} from "./pages/login";
import {useDispatch, useSelector} from "react-redux";
import {Footer} from "./pages/Footer";
import {PlatformSearchProduct} from "./pages/PlatformSearchProduct";
import {SourceCode} from "./pages/source-code";
import {PrivacyPolicy} from "./pages/privacy-policy";
import {Layout, Spin} from "antd";
import {LostPassword} from "./pages/lost-password";
import {SignUp} from "./pages/Sign-up";
import {APIContext} from "./context/context";
import {BecomeSeller} from "./pages/auth/become-seller";
import {UserDetails} from "./pages/auth/user-details";
import {NotFound} from "./pages/404";
import {SyncOutlined} from "@ant-design/icons";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import apiClient from "./shared/apiClient";
import {handleError} from "./shared/handleError";
import {TermsCondition} from "./pages/TermsCondition";
import {ProductComment} from "./pages/auth/product-comment";
import {SoldReady2Use} from "./pages/SoldReady2Use";
import {SignUpMessage} from "./pages/sign-up-message";
import MakeDeposit from './pages/MakeDeposit';
import DashboardComponent from './pages/auth/Dashboard';
import ServicesComponent from './pages/Services';
import ProcessComponent from './pages/Process';
import PackagesComponent from './pages/Packages';
import BuyerFaqsComponent from './pages/BuyerFaqs';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [cartState, setCartState] = useState([])
    const [loginResponse, setLoginResposne] = useState({})
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState()
    const dispatch = useDispatch()
    const settingState = useSelector(state => state.SettingReducer)

    useEffect(() => {
        dispatch({type: "SETTING_LOADING"})
        apiClient.post(`/get-front-settings`).then(r => dispatch({type: 'SETTING_SUCCESS', payload: r.data})).catch(e => dispatch({type: 'SETTING_FAILED', payload: handleError(e)}))
    }, [])

    useEffect(() => {
        setSettings(settingState.settings.filter(v => v.key === "paypal_client_id"))
    },[settingState])

    return (<Router>
        <Spin spinning={loading} size="large" indicator={<SyncOutlined spin />}>
            <APIContext.Provider value={[loginResponse, setLoginResposne, cartState, setCartState]}>
                <AppHeader setLoading={setLoading} />
                <Layout.Content style={{ padding: '2% 10%' }}>
                    <Switch>
                    {/* <Route path={"/edit-product/step3/:id"}>
                            <EditProductStep3 />
                        </Route> */}
                        <Route path="/buyer-faqs" exact>
                            <BuyerFaqsComponent />
                        </Route>
                        <Route path="/packages" exact>
                            <PackagesComponent />
                        </Route>
                        <Route path="/process" exact>
                            <ProcessComponent />
                        </Route>
                        <Route path="/services" exact>
                            <ServicesComponent />
                        </Route>
                        <Route path="/make-a-deposit" exact>
                            <MakeDeposit />
                        </Route>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/game-template" exact>
                            <GameTemplate />
                        </Route>
                        <Route path="/app-template" exact>
                            <AppTemplate />
                        </Route>
                        <Route path="/hot-deals" exact>
                            <HotDeals />
                        </Route>
                        <Route path="/sell-your-app" exact>
                            <SellYourApp />
                        </Route>
                        <Route path="/ready-2-use" exact>
                            <Ready2Use />
                        </Route>
                        <Route path="/sold-ready-2-use" exact>
                            <SoldReady2Use />
                        </Route>
                        <Route path="/sell-your-app">
                            <SellYourApp />
                        </Route>
                        <Route path="/platform/:q">
                            <PlatformSearchProduct />
                        </Route>
                        <Route path="/product-detail/:id">
                            <ProductDetail />
                        </Route>
                        <Route path="/source-code">
                            <SourceCode />
                        </Route>
                        <Route path="/privacy-policy">
                            <PrivacyPolicy />
                        </Route>
                        <Route path="/lost-password">
                            <LostPassword />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <Route path={"/search/:q"}>
                            <Search />
                        </Route>
                        <Route path={"/search/"}>
                            <Search />
                        </Route>
                        <Route path={["/developer_terms_condition", "/buyer_terms_condition", "/reskin_terms_condition", "/user_terms_condition", "/affiliate_terms_condition"]}>
                            <TermsCondition />
                        </Route>
                        <Route path={`/product-comments/:id`}>
                            <ProductComment />
                        </Route>
                        <Route path={"/user-profile/:id"} exact>
                            <UserProfile />
                        </Route>
                        <Route path={"/sign-up-complete"}>
                            <SignUpMessage />
                        </Route>
                        <Route path={"/404"}>
                            <NotFound />
                        </Route>

                        {/*Auth Routes*/}
                        <PrivateRoute path={"/purchases"}>
                            <Parchase />
                        </PrivateRoute>
                        <PrivateRoute path={"/wish-list"}>
                            <WishList />
                        </PrivateRoute>
                        <PrivateRoute path={"/follow-list"}>
                            <FollowList />
                        </PrivateRoute>
                        <RestrictedRoute path={"/products"}>
                            <Products />
                        </RestrictedRoute>
                        <RestrictedRoute path={"/add-product"}>
                            <AddProduct />
                        </RestrictedRoute>
                        <RestrictedRoute path={"/edit-product/step2/:id"}>
                            <EditProductStep2 />
                        </RestrictedRoute>
                        {/*<Route path={"/edit-product/step2/:id"}>*/}
                        {/*    <EditProductStep2 />*/}
                        {/*</Route>*/}
                        <RestrictedRoute path={"/edit-product/step3/:id"}>
                            <EditProductStep3 />
                        </RestrictedRoute>
                        <Route path={"/edit-product/:id"}>
                            <EditProduct />
                        </Route>
                        <RestrictedRoute path={"/edit-product/:id"}>
                            <EditProduct />
                        </RestrictedRoute>
                        <RestrictedRoute path={"/product-added"}>
                            <ProductAdded />
                        </RestrictedRoute>
                        <RestrictedRoute path={"/order"}>
                            <Order />
                        </RestrictedRoute>
                        <RestrictedRoute path={"/earning"}>
                            <Earning />
                        </RestrictedRoute>
                        <PrivateRoute path={"/dashboard"}>
                            <DashboardComponent />
                        </PrivateRoute>
                        <PrivateRoute path={"/message"}>
                            <Message />
                        </PrivateRoute>
                        <PrivateRoute path={"/checkout"} >
                            <PayPalScriptProvider options={{ "client-id": `${settings && settings.length > 0 && settings[0].value}`}}>
                                <Checkout />
                            </PayPalScriptProvider>
                        </PrivateRoute>
                        <PrivateRoute path={"/user-details/:id"}>
                            <UserDetails />
                        </PrivateRoute>
                        <PrivateRoute path={"/BecomeSeller/:id"} >
                            <BecomeSeller />
                        </PrivateRoute>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Layout.Content>
                <Footer />
            </APIContext.Provider>
        </Spin>
    </Router>);
}

function PrivateRoute({ children, ...rest }) {

    const loginState = useSelector(state => state.UserReducer)

    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    loginState.LoggedIn
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

// const PublicRoute = ({children, ...rest}) => {
//     const loginState = useSelector(state => state.UserReducer)
//     return (
//         <Route
//             {...rest}
//             render={
//                 ({ location }) => (
//                     !loginState.LoggedIn
//                         ? (
//                             children
//                         ) : (
//                             <Redirect
//                                 to={{
//                                     pathname: '/',
//                                     state: { from: location }
//                                 }}
//                             />
//                         ))
//             }
//         />
//     );
// }

const RestrictedRoute = ({children, ...rest}) => {
    const loginState = useSelector(state => state.UserReducer)
    const becomeSellerState = useSelector(state => state.BecomeSellerReducer)

    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    loginState.LoggedIn && loginState.message && becomeSellerState.becomeSeller
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    );
}

export default App;
