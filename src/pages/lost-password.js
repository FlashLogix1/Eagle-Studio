import {Button, Form, Input, Row, Spin, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import {getDataByPost} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";
import {useHistory} from "react-router";
import {useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";


export const LostPassword = () => {

    const [form] = useForm()
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const forgetPassword = (v) => {
        setLoading(true)
        getDataByPost(`forgetPassword`, v).then(r => {
            openNotificationWithIcon("success", r.data.message)
            setLoading(false)
            history.push("/login")
        }).catch(e => {
            setLoading(false)
            openNotificationWithIcon('error', handleError(e))
        })
    }

    return (<div>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} />} spin spinning={loading}>
            <Typography.Title type="secondary" level={2}>Password Forget</Typography.Title>
            <br />
            <Typography.Text>A System generated password will been sent to your provided email</Typography.Text>

            <Form
                form={form}
                layout="vertical"
                onFinish={forgetPassword}
                style={{marginTop: "20px"}}
            >
                <Form.Item name="email" label="Enter your email address">
                    <Input type="email" placeholder="A System generated password will been sent to your provided email"/>
                </Form.Item>
                <Row justify="center">
                    <Button htmlType="submit" type="primary" shape="round" size="large" block >Sign up</Button>
                </Row>
            </Form>
        </Spin>
    </div>)
}