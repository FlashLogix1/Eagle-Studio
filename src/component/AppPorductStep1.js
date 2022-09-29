import {Button, Checkbox, Col, Form, Input, Row, Select} from "antd";
import {useEffect, useState} from "react";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useHistory, useParams} from "react-router";

export const AppPorductStep1 = (props) => {

    const [form] = Form.useForm()
    const [productCategory, setProductCategory] = useState()
    const [framework, setFramework] = useState()
    const [os, setOS] = useState()
    const [subCategory, setSubCategory] = useState()
    const [template, setTemplate] = useState()
    const [, setError] = useState('');
    // Begin form field states
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productFeatures, setProductFeatures] = useState('');
    const [productTemplateId, setProductTemplateId] = useState();
    const [productCategoryId, setProductCategoryId] = useState();
    const [frameworkId, setFrameworkId] = useState();
    const [operatingSystemId, setOperatingSystemId] = useState();
    const [productSubCategoryId, setProductSubCategoryId] = useState();
    // End form field states
    const history = useHistory();
    const {id} = useParams();
    const [urlProductId, setUrlProductId] = useState();



    useEffect(() => {
        getData('/product_template').then(r => {
            setTemplate(r.data);
            console.log(r.data, 'Success product_template');
        }).catch(e => setError(handleError(e)))
        getData('/product_category').then(r => {
            setProductCategory(r.data);
            console.log(r.data, 'Success Product Category');
        }).catch(e => setError(handleError(e)))
        getData('/framework').then(r => {
            setFramework(r.data);
            console.log(r.data, 'Success framework');
        }).catch(e => setError(handleError(e)))
    },[])

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const getOS = v => {
        getData(`${v}/operating_system`).then(r => {
            setOS(r.data);
            console.log(r.data, 'Success operating_system');
        }).catch(e => setError(handleError(e)))
    }

    const getProductSubcategory = (v) => {
        getData(`${v}/product_subcategory`).then(r => {
            setSubCategory(r.data);
            console.log(r.data, 'Success product_subcategory');
        }).catch(e => setError(handleError(e)))
    }

    useEffect(() => {
        form.setFieldsValue(props?.product)
        if(props?.product?.product_template)
            getProductSubcategory(props.product?.product_template)
        if(props?.product?.product_category)
            getOS(props?.product?.product_category)
    },[props.product])

    // const postDataAppProductStep1 = () => 
    // {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Accept", "application/json");
    //     myHeaders.append("X-Requested-With", "application/json");
    //     myHeaders.append("Authorization", `Bearer ${localStorage.getItem("findMeToken")}`);

    //     const formdata = new FormData();
    //     formdata.append("title", productTitle);
    //     formdata.append("product_template", productTemplateId);
    //     formdata.append("product_category", productCategoryId);
    //     formdata.append("product_subcategory", productSubCategoryId);
    //     formdata.append("operating_systems", operatingSystemId);
    //     formdata.append("framework", frameworkId);
    //     formdata.append("features", productFeatures);
    //     formdata.append("description", productDescription);

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: 'follow'
    //     };

    //     fetch("https://api.findmeapps.com/api/product", requestOptions)
    //     .then(response => response.json())
    //     .then(resultParam1 => {
    //         console.log(resultParam1, 'Success Post Data AppProductStep1');
    //         console.log(resultParam1.id, 'new product id');
    //         // setUrlProductId(resultParam1.id);
    //         history.push(`/edit-product/step2/${resultParam1.id}`);
    //     })
    //     .catch(error => console.log('error', error));
    // }


    return (<div>
            {/*  */}
            <Form form={form} {...layout} name="control-hooks" onFinish={v => {
                console.log(v, 'check me -----');
                props.next(v);
                // postDataAppProductStep1();
            }}>
                <Form.Item name="product_template" label="Template Type:" rules={[{ required: true }]} style={{paddingLeft: "50px", paddingRight: "68px"}}>
                    <Select style={{width: "100%"}} onSelect={(v) => {
                        getProductSubcategory(v);
                        console.log(v, 'product template id');
                        setProductTemplateId(v);                        // state set
                    }} value={props?.product?.product_template.id}>
                        {/* {
                            console.log(template[0], 'what is template')
                        }
                        {
                            console.log(template[0]?.name, 'what is template')
                        } */}
                        {template?.length > 0 && template.map(v =>
                            <Select.Option key={v.id}>{v.name}</Select.Option>
                        ).slice(0, 2)}
                    </Select>
                </Form.Item>

                <Form.Item label="Product Subcategory:" name="product_subcategory" style={{paddingLeft: "16px"}}>
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {/* {
                                console.log(subCategory[0], 'Product Subcategory object')
                            }
                            {
                                console.log(subCategory[0]?.id, 'Product Subcategory ID')
                            } */}
                        {subCategory && subCategory.map(v => <Col>
                                <Checkbox value={v.id} onChange={eventParam1 => {
                                    console.log(eventParam1.target.value, 'sub category');
                                    setProductSubCategoryId(eventParam1.target.value);
                                }}>{v.name}</Checkbox>
                            </Col>
                        )}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="product_category" label="Product category:" rules={[{ required: true }]} style={{paddingLeft: "30px", paddingRight: "83px"}}>
                    <Select style={{width: "100%"}} onSelect={v => {
                        getOS(v);
                        console.log(v, 'testing product category id');
                        setProductCategoryId(v);                            // state set
                    }}>
                        {/* {
                            console.log(productCategory[1], 'Product Category object')
                        }
                        {
                            console.log(productCategory[1]?.id, 'Product Category object')
                        } */}
                        {productCategory && productCategory.map(v =>
                            <Select.Option key={v.id}>{v.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="Operating systems:" name="operating_systems" style={{paddingLeft: "31px"}}>
                    <Checkbox.Group style={{ width: '100%' }} >
                        <Row>
                            {/* {
                                console.log(os[0], 'operating system object')
                            }
                            {
                                console.log(os[0]?.id, 'operating system object')
                            } */}
                            {os && os.map(v => <Col>
                                    <Checkbox onChange={eventParam1 => {
                                        console.log(eventParam1.target.value, 'Checkbox');
                                        setOperatingSystemId(eventParam1.target.value);
                                    }} value={v.id}>{v.name}</Checkbox>
                                </Col>
                            )}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item name="framework" label="Framework:" rules={[{ required: true }]} style={{paddingLeft: "74px", paddingRight: "30px"}}>
                    <Select style={{width: "100%"}} onSelect={ v => {
                        console.log(v, 'framework id');
                        setFrameworkId(v);
                    }}>
                        {/* {
                            console.log(framework[0], 'framework object')
                        }
                        {
                            console.log(framework[0]?.id, 'framework object')
                        } */}
                        {framework && framework.map(v =>
                            <Select.Option key={v.id}>{v.name}</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item name="title" label="Product Title:" rules={[{ required: true }]} style={{paddingLeft: "63px", paddingRight: "34px"}}>
                    <Input style={{width: "100%"}} value={productTitle} onChange={(eventParam1) => setProductTitle(eventParam1.target.value)} />
                </Form.Item>

                <Form.Item name="description" label="Description:" rules={[{ required: true }]} style={{paddingLeft: "73px", paddingRight: "24px"}}>
                    <TextArea style={{width: "100%"}} value={productDescription} onChange={ (paragraphParam1) => {
                        console.log(paragraphParam1, 'paragraph is received as a parameter for description');
                        console.log(document.getElementsByTagName('p')[0].innerHTML, 'check 1');
                        setProductDescription(document.getElementsByTagName('p')[0].innerHTML);         // state set in a React Function Based Component
                    }} />
                </Form.Item>

                <Form.Item name="features" label="Features:" rules={[{ required: true }]} style={{paddingLeft: "93px"}}>
                    <TextArea style={{width: "100%"}} value={productFeatures} onChange={ (paragraphParam1) => {
                        console.log(paragraphParam1, 'paragraph is received as a parameter for features');
                        console.log(document.getElementsByTagName('p')[1].innerHTML, 'check 2');
                        setProductFeatures(document.getElementsByTagName('p')[1].innerHTML);             // state set in a React Function Based Component
                    } } />
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