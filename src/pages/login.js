import {Alert, Button, Checkbox, Col, Divider, Form, Image, Input, Row, Spin, Typography} from "antd";
import Text from "antd/es/typography/Text";
import {SyncOutlined, UserOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {useContext, useEffect, useReducer, useState} from "react";
import {getData, login} from "../actions/common";
import {readLS, writeLS} from "../shared/LS";
import {handleError} from "../shared/handleError";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import logo from "../assets/findmeapp.png";
import {APIContext} from "../context/context";
import {openNotificationWithIcon} from "../shared/notification";
import {Link} from "react-router-dom";


export const Login = () => {

    const [form] = useForm()
    const [cartState, setCartState] = useContext(APIContext)
    const [randomNumber, setRandomNumber] = useState(0)
    const [showError, setShowError] = useState(false)
    const loginState = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    let history = useHistory()

    useEffect(() => setRandomNumber(Math.round(Math.random() * 99)), [])

    const validate = v => {
        if(parseInt(v.security) === randomNumber+1)
        {
            dispatch({type: 'USER_LOADING'})
            setShowError(false)
            login(`login`, v).then(r => {
                if(r.status) {
                    writeLS('findMeToken', r.data.token)
                    writeLS('id', r.data?.id)
                    dispatch({type: 'USER_SUCCESS', payload: r.data})
                }
            }).then(() => getData(`get-become-seller`).then(r => dispatch(({'type': "BECOME_SELLER_SUCCESS", payload: r.data}))).catch(e => console.log(handleError(e)))).then(() => {
                getData(`cart/${readLS('id')}`).then(r => setCartState(r.data)).catch(e => setShowError(e))
                history.push('/message')
            }).catch(e => {
                    openNotificationWithIcon("error",handleError(e))
                    dispatch({type: 'USER_FAILED', payload: handleError(e)})
                })
        }
        else setShowError(true)
    }

    return (
        <Spin spinning={loginState.isLoading} indicator={<SyncOutlined spin />}>

            <Row justify="center" style={{marginTop: '20px'}}>
                <div>Login</div>
            </Row>

            <Row justify="center" style={{marginTop: '20px'}}>
                <div>Sign-in to your SellMyApp account</div>
            </Row>

            {loginState.errMess && <Row justify="center" style={{marginTop: '20px', marginBottom: '20px'}}>
                <Alert
                    message="Error"
                    description={loginState.errMess}
                    type="error"
                    showIcon
                />
            </Row>}

            <Form
                form={form}
                layout="vertical"
                onFinish={validate}
                labelCol={{sm: {span: 8, offset: 8}, md: {span: 12, offset: 6}, lg: {span: 8, offset: 8}, xl: {span: 8, offset: 8}}}
                wrapperCol={{sm: {span: 8, offset: 8}, md: {span: 12, offset: 6}, lg: {span: 8, offset: 8}, xl: {span: 8, offset: 8}}}
            >
                <Form.Item name="username" label="Username">
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input.Password />
                </Form.Item>
                <Row justify="center">
                    Security Question
                </Row>
                <Row justify="center">
                    {`How much is ${randomNumber} + 1?`}
                </Row>
                <Form.Item name="security">
                    <Input />
                </Form.Item>
                <Row justify="center">{showError && <span style={{color: '#ee3658'}}>Please answer the security question correctly.</span>}</Row>
                <Row justify="center">
                    <Checkbox>Remember Me</Checkbox>
                </Row>

                <Row justify="center"><Typography.Link type="secondary"><Link to="/lost-password">Forgot your password?</Link></Typography.Link></Row>

                <Form.Item name="security" >
                    <Button htmlType="submit" type="primary" shape="round" size="large" title="Login" block>Login</Button>
                </Form.Item>
                {/*<Form.Item label="Security Question" labelCol={{span: 24, offset: 8}} />*/}
                {/*<Form.Item label={`How much is ${Math.round(randomNumber)} + 1`} />*/}
                {/*<Form.Item ></Form.Item>*/}
            </Form>
        </Spin>
    )
}