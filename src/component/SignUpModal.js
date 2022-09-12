import {useForm} from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import {Anchor, Button, Checkbox, Col, Form, Image, Input, Row, Spin, Typography} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import logo from "../assets/findmeapp.png"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {createAccountSignIn} from "../actions/common";
import {writeLS} from "../shared/LS";
import {openNotificationWithIcon} from "../shared/notification";
import {handleError} from "../shared/handleError";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

export const SignUpModal = ({ visible, setVisible, btnLoading, resetFilter, setVisibleLogin}) => {

    const [form] = useForm()
    const [randomNumber, setRandomNumber] = useState(0)
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => setRandomNumber(Math.round(Math.random() * 99)),[])

    const submit = v => {
        setLoading(true)
        dispatch({type: 'USER_LOADING'})
        createAccountSignIn(`sign-up`, v).then(r => {
            setLoading(false)
            setLoading(false)
            if(r.status) {
                dispatch({type: 'USER_SUCCESS_SIGNUP', payload: r.data})
                openNotificationWithIcon('success', r.data)
                setVisible(false)
                history.push("/sign-up-complete")
            }
        }).catch(e => {
            setLoading(false)
            openNotificationWithIcon('error', handleError(e))
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
        title="Sign Up"
    >
        <div style={{textAlign: 'center'}}>
            <Image src={logo} preview={false}/>
            <div>
                <label>Sign up is 100% FREE!</label>
            </div>
        </div>
        <Spin spinning={loading} indicator={<SyncOutlined spin />}>
            <Form
                form={form}
                layout="vertical"
                onFinish={validate}
            >
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <Form.Item name="username" label="User Name">
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="Email">
                    <Input type="email"/>
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
                    <Button htmlType="submit" type="primary" shape="round" size="large" block >Sign up</Button>
                </Row>
                <br />
                <Row justify="center">By clicking 'Sign Up' You agree to our <Link to="/developer-terms-conditions" onClick={() => setVisible(false)}>terms & conditions.</Link></Row>
                <Row justify="center" onClick={() => {
                    setVisible(false)
                    setVisibleLogin(true)
                }}><span style={{cursor: 'pointer'}}>I already have an account</span></Row>
                <Row justify="center"><Typography.Link type="secondary" onClick={() => setVisible(false)}><Link to="/lost-password">Forgot your password?</Link></Typography.Link></Row>
            </Form>
        </Spin>
    </Modal>)
}