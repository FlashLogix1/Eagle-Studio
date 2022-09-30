import {Button, Checkbox, Col, Form, Input, Radio, Row, Skeleton, Typography, Card} from "antd";
import {useEffect, useState} from "react";
import apiClient from "../../shared/apiClient";
import {getData, saveData, updateData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';


export const BecomeSeller = () => {

    const [form] = Form.useForm();
    const {id} = useParams()
    const [value, setValue] = useState()
    const [os, setOS] = useState()
    const [framework, setFramework] = useState()
    const [sellerData, setSellerData] = useState({})
    const [loading, setLoading] = useState(true)
    const [btnName, setBtnName] = useState("Save")
    const dispatch = useDispatch()

    const getDataFromAPI = () => {
        getData(`become-seller/${id}`).then(r => {
            let data = r.data
            form.setFieldsValue({...data, framework: data.framework?.map(v => v.id), product_categories: data.product_categories?.map(v => v.id)})
            setSellerData(r.data)
            setBtnName("Update")
            setLoading(false)
        }).catch(e => {
            openNotificationWithIcon('error', handleError(e))
            setLoading(false)
        })
    }

    useEffect(() => {
        getData(`product_category`).then(r => setOS(r.data)).catch(e => console.log(handleError(e)))
        getData(`framework`).then(r => setFramework(r.data)).catch(e => console.log(handleError(e)))
        getDataFromAPI()
    },[])

    const handleonChange = (e) => setValue(e.target.value.split('-')[1])

    const onFinish = v => {
        if(Object.keys(sellerData).length)
            updateData(`become-seller/${sellerData.id}`, v).then(r => {
                openNotificationWithIcon('success',r.data)
                setLoading(false)
            }).catch(e => {
                openNotificationWithIcon('error',handleError(e))
                setLoading(false)
            })
        else
            saveData(`become-seller`, v).then(r => {
                openNotificationWithIcon('success',r.data)
                setLoading(false)
                setBtnName("Update")
                getDataFromAPI()
            }).then(()=> getData(`get-become-seller`).then(r => dispatch(({'type': "BECOME_SELLER_SUCCESS", payload: r.data}))).catch(e => console.log(handleError(e)))
            ).catch(e => {
                openNotificationWithIcon('error',handleError(e))
                setLoading(false)
            })

    }

    return (<>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name="BECOME SELLER" />
            </div>
        </div>
        <div className="site-card-border-less-wrapper" style={{width: "800px", margin: "auto"}}>
                <Card title="Developer Details" bordered={true}>
                    <Skeleton loading={loading} active>
                        <Form form={form} name="control-hooks" onFinish={onFinish} title={"Developer Details"}  labelCol={{ span: 12}}
                            wrapperCol={{ span: 16 }} layout="vertical">

                            <Form.Item name="paypal_email" label="Paypal Email" rules={[{required: true}]}>
                                <Input type="email" />
                            </Form.Item>

                            <Form.Item name="company_name" label="Company Name" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="billing_address" label="Billing Address" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="billing_city" label="Billing City" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="billing_zip_postal_code" label="Postal Code" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item name="VAT_number" label="VAT Number" >
                                <Input />
                            </Form.Item>

                            <Form.Item name="developer_type" label="Developer Type" rules={[{ required: true }]}>
                                <Radio.Group onChange={handleonChange} value={value} style={{backgroundColor: '#00000026 !important'}}>
                                    <Row>
                                        <Radio value='independent_developer'>Independant Developer</Radio>
                                    </Row>
                                    <Row>
                                        <Radio value='development_agency'>Development Agency</Radio>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="product_categories" label="Operating System" rules={[{ required: true }]}>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        {os && os?.map(v => <Checkbox value={v.id}>{v.name}</Checkbox>)}
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>

                            <Form.Item name="framework" label="Frame Work" rules={[{ required: true }]}>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row >
                                        {framework && framework?.map(v => <Checkbox value={v.id}>{v.name}</Checkbox>)}

                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>


                            <Form.Item name="development_experience" label="Developing Experince" rules={[{ required: true }]}>
                                <Radio.Group value={value} style={{backgroundColor: '#00000026 !important'}}>
                                    <Row>
                                        <Radio value='1-3'>1 - 3 years</Radio>
                                    </Row>
                                    <Row>
                                        <Radio value='3-5'>3 - 5 years</Radio>
                                    </Row>
                                    <Row>
                                        <Radio value='5+'>more than 5years</Radio>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>

                            {/*<Form.Item>*/}
                            {/*    <span>Become Seller Request Status : {sellerData && typeof sellerData == "object" && sellerData?.active == 0 ? <span><ClockCircleTwoTone style={{ fontSize: '20px'}} /> Pending</span> : sellerData?.active == 1 ? <span><CheckCircleTwoTone twoToneColor='green' style={{ fontSize: '20px'}} /> Approved</span> : <span><CloseCircleTwoTone twoToneColor='red' style={{ fontSize: '20px'}} /> Rejected</span>}</span>*/}
                            {/*</Form.Item>*/}

                            <Form.Item wrapperCol={{ span: 16}}>
                                <Button htmlType="submit" type="primary" value={btnName}>{btnName}</Button>
                            </Form.Item>
                        </Form>
                    </Skeleton>
                </Card>
        </div>
        {/* <Typography.Title>Developer Details</Typography.Title> */}
        
    </>)
}