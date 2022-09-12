import Modal from "antd/es/modal/Modal";
import {useForm} from "antd/es/form/Form";
import {SaveOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Checkbox, Col, Form, Image, Input, Row, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import logo from "../assets/findmeapp.png";
import {Link} from "react-router-dom";
import {getData, login} from "../actions/common";
import {readLS, writeLS} from "../shared/LS";
import {handleError} from "../shared/handleError";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

export const LoginModal = ({ visible, setVisible, setCartState, resetFilter, setVisibleSignup}) => {

    const [form] = useForm()
    const [randomNumber, setRandomNumber] = useState(0)
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)
    const loginState = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => setRandomNumber(Math.round(Math.random() * 99)),[])

    const submit = v => {
        setLoading(true)
        dispatch({type: 'USER_LOADING'})
        login(`login`, v).then(r => {
            setLoading(false)
            if(r.status) {
                writeLS('findMeToken', r.data.token)
                writeLS('id', r.data?.id)
                setVisible(false)
                dispatch({type: 'USER_SUCCESS', payload: r.data})
            }
        }).then(() => getData(`get-become-seller`).then(r => dispatch(({'type': "BECOME_SELLER_SUCCESS", payload: r.data}))).catch(e => console.log(handleError(e)))).then(() => {
            getData(`cart/${readLS('id')}`).then(r => setCartState(r.data)).catch(e => console.log(e))
            setLoading(false)
        }).then(() => history.push('/message')).catch(e => {
                setLoading(false)
                dispatch({type: 'USER_FAILED', payload: handleError(e)})
            })
    }

    const validate = v => {
        if(v.security == randomNumber+1)
        {
            setShowError(false)
            submit(v)
        }
        else setShowError(true)
    }

    return( <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        title="Login"
    >
        <div style={{textAlign: 'center'}}>
            <Image src={logo} preview={false}/>
            <div>
                <label>Log-in to your FindMeApps account</label>
            </div>
        </div>
        <Spin spinning={loading} indicator={<SyncOutlined spin />}>
            <Form
                form={form}
                layout="vertical"
                onFinish={validate}
            >
                <Form.Item name="username" label="UserName">
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
                <Form.Item name="security" >
                    <Input />
                </Form.Item>
                <Row justify="center">{showError && <span style={{color: '#ee3658'}}>Please answer the security question correctly.</span>}</Row>
                <Row justify="center">
                    <Checkbox>Remember Me</Checkbox>
                </Row>
                <br />
                <Row justify="center">
                    <Button htmlType="submit" type="primary" shape="round" size="large" title="Login" block>Login</Button>
                </Row>
                <br />
                <Row justify="center" onClick={() => {
                    setVisible(false)
                    setVisibleSignup(true)
                }}><span style={{cursor: 'pointer'}}>I don't have an account</span></Row>
                <Row justify="center"><Typography.Link type="secondary" onClick={() => setVisible(false)}><Link to="/lost-password">Forgot your password?</Link></Typography.Link></Row>
            </Form>
        </Spin>
    </Modal>)
}