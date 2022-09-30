import {message , Button, Form, Image, Input, Upload} from "antd";
import {useEffect, useState} from "react";
import {getData, postData, saveData} from "../../actions/common";
import {useParams} from "react-router";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {readLS} from "../../shared/LS";


export const UserDetails = () => {

    const [form] = Form.useForm()
    const [user, setUser] = useState()
    const [image, setImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAAAAAAdwx7eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBw0JGhXTatJGAAAC/ElEQVRYw+3Z21biMBQG4L7/OyWltKBWlIMg4AwFRFARqy3WQ9MmU5QZXTOk2TuRu8kdF3zrX7tJupNaYm/D+k9r0flzuAiG/f4wWITP+ffReTxt1yuUkmJQWqm3pzFEV9PZquu+m79H8cPtrjJjmj90Kl/YP3yl88DN6HTk7oDfcTdITeinFi0ZrSd9OvJJGU38SJeOjkrlwj6K9OjEV8ib3IkOzTpKubA7TIOequHNmOLpdQ0QuohdW2NpPgDJhT3gSDr2YDKlXoykR8DQRewRjmbHcPqYoehHBypT6jyi6BlcpnSGoqHz42OOYOi8jaHbOYJmpxj6lCHotIGhGymCZicY+gSTOkMVpJkh6D0+RtHD0F2OoBPUY2wjCpJh6lH0UzM4jdlBqHSD2knfoGRKa09geoGk3RhML7GpEzAdVXG19lMw/aZqm/6id0/s3fO6j6LpHD75xF0FE7qeIGjczjfELHRxA48t7Z8kdHYOjm1PBIoWL9CSkCZD0uAVSQKBpUMbWI8lml67MNpFN8HQ+Sd755bR4gqWeibw9BvkJUb8Vw1aXAMepD0XOnR2pj7cnaZatIiUJyVnJfRo5flOfkRS0qy8aSCHidClRVwvs+2F0KfFvGSWkLPMhM77crkWCxNavEivF+ypMKPFUHZB1GKmdCBLfaX6p5K+lNX6xpi+ltG3xvTt/mhpa2leEGnqhTEtfbNfGtMT2WIcmdJc1kaRnul1bSA9MVXHzIDmYdl1rd2JdGm+HlTLXwXe+FWH5vGFp+4W/HmKpdmq50K6J2Ifz14RNH+eNSvQ/prQo3ECPCax+8EBxRyTCKkN7jMlzdeThkNw56+N7jTnL7yMfrvteqjAX+tycPGQSWgeB76t527rsom+g/74sKMPb6Mf/vz80PRBZ8uWY+puo3vnYf5J88cOeK4BdKcb8i3NJqDVgcCrg+SdZn1z7B/88K6g+Y/vlzc711JYIe5aBWwfrK3RXuRijC3MPSQqds/C3EOi6IYF/v6CHd4vNEnMDvXbQPwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDctMTNUMDk6MjY6MjEtMDQ6MDCHQinlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA3LTEzVDA5OjI2OjIxLTA0OjAw9h+RWQAAAABJRU5ErkJggg==")
    const [loading, setLoading] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        getData(`getUser/${id}`).then(r => setUser(r.data)).catch(e => console.log(handleError(e)))
    }, [])

    useEffect(() => {
        if(user) {
            setImage(user.profile_img)
            form.setFieldsValue(user)
        }
    }, [user])

    const onFinish = v => {
        console.log(v)
        postData(`change-password/${user.id}`, v).then(r => openNotificationWithIcon('success', r.data)).catch(e => openNotificationWithIcon('error',handleError(e)))
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = (info) => {
        if(info.file.response)
            setImage(info.file.response.data)
        setLoading(false)
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return(<>
        <Form
            onFinish={onFinish}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            form={form}
            style={{paddingLeft: "150px", marginTop: "30px"}}
        >
            <Form.Item label="Profile Image">
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    headers={{
                        authorization: `Bearer ${readLS('findMeToken')}`
                    }}
                    action={`${process.env.REACT_APP_BASE_URL}/${id}/upload-profile-image`}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    style={{marginLeft: "32px"}}
                >
                    {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item name='username' label={"User Name"}>
                <Input disabled style={{marginLeft: "49px"}} />
            </Form.Item>
            <Form.Item name='email' label={'Email'}>
                <Input type="email" disabled style={{marginLeft: "93px"}} />
            </Form.Item>
            <Form.Item name='current_password' label="Current Password">
                <Input.Password />
            </Form.Item>
            <Form.Item name='password' label="New Password">
                <Input.Password style={{marginLeft: "26px"}} />
            </Form.Item>
            <Form.Item name="password_confirmation" label="Confirm Password">
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 16}}>
                <Button htmlType="submit" type="primary">Update</Button>
            </Form.Item>
        </Form>
    </>)
}