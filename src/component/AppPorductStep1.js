import {Button, Checkbox, Col, Form, Input, Row, Select} from "antd";
import {useEffect, useState} from "react";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export const AppPorductStep1 = (props) => {

    const [form] = Form.useForm()
    const [productCategory, setProductCategory] = useState()
    const [framework, setFramework] = useState()
    const [os, setOS] = useState()
    const [subCategory, setSubCategory] = useState()
    const [template, setTemplate] = useState()
    const [, setError] = useState('')

    useEffect(() => {
        getData('/product_template').then(r => setTemplate(r.data)).catch(e => setError(handleError(e)))
        getData('/product_category').then(r => setProductCategory(r.data)).catch(e => setError(handleError(e)))
        getData('/framework').then(r => setFramework(r.data)).catch(e => setError(handleError(e)))
    },[])

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const getOS = v => {
        getData(`${v}/operating_system`).then(r => setOS(r.data)).catch(e => setError(handleError(e)))
    }

    const getProductSubcategory = (v) => {
        getData(`${v}/product_subcategory`).then(r => setSubCategory(r.data)).catch(e => setError(handleError(e)))
    }

    useEffect(() => {
        form.setFieldsValue(props?.product)
        if(props?.product?.product_template)
            getProductSubcategory(props.product?.product_template)
        if(props?.product?.product_category)
            getOS(props?.product?.product_category)
    },[props.product])

    return (<div>
            {/*  */}
            <Form form={form} {...layout} name="control-hooks" onFinish={v => props.next(v)}>
                <Form.Item name="product_template" label="Template Type:" rules={[{ required: true }]}>
                    <Select onChange={(v) => getProductSubcategory(v)} value={props?.product?.product_template.id}>
                        {template?.length > 0 && template.map(v =>
                            <Select.Option value={v.id}>{v.name}</Select.Option>
                        ).slice(0, 2)}
                    </Select>
                </Form.Item>

                <Form.Item label="Product Subcategory:" name="product_subcategory">
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                        {subCategory && subCategory.map(v => <Col>
                                <Checkbox value={v.id}>{v.name}</Checkbox>
                            </Col>
                        )}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="product_category" label="Product category:" rules={[{ required: true }]}>
                    <Select onChange={v => getOS(v)}>
                        {productCategory && productCategory.map(v =>
                            <Select.Option value={v.id}>{v.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="Operating systems:" name="operating_systems">
                    <Checkbox.Group style={{ width: '100%' }} >
                        <Row>
                            {os && os.map(v => <Col>
                                    <Checkbox value={v.id}>{v.name}</Checkbox>
                                </Col>
                            )}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="framework" label="Framework:" rules={[{ required: true }]}>
                    <Select>
                        {framework && framework.map(v =>
                            <Select.Option value={v.id}>{v.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item name="title" label="Product Title:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description:" rules={[{ required: true }]}>
                    <TextArea />
                </Form.Item>

                <Form.Item name="features" label="Features:" rules={[{ required: true }]}>
                    <TextArea />
                </Form.Item>

                <Row justify="center">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >Save & Continue</Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>)
}

const TextArea = ({value, onChange}) => {

    const modules = {
        toolbar:[
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],


            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'align': [] }],

            ['link', 'image'],
            ['link', 'video'],

            ['clean']                                         // remove formatting button
        ]
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color',"background","code","script"
    ]

    return (
        <>
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                // formats={formats}
            />
        </>)
}