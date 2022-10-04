import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { AiOutlineMail, FaPhoneAlt, FaMap } from 'react-icons/all';


const ContactComponent = () => {

    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [formLayout, setFormLayout] = useState('vertical');

    // const formItemLayout =
    // formLayout === 'horizontal'
    //   ? {
    //       labelCol: {
    //         span: 4,
    //       },
    //       wrapperCol: {
    //         span: 14,
    //       },
    //     }
    //   : null;

    const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

    
    // runs after every render
    useEffect(
        () => {
            // document.getElementById("contactInput1").classList.add("footerCustomStyle6");
            document.getElementById("contactInput1").style.borderRadius = "50px";
            document.getElementById("contactInput2").style.borderRadius = "50px";
            document.getElementById("contactInput3").style.borderRadius = "50px";
            document.getElementById("contactTextArea1").style.borderRadius = "20px";
        }
    );



  return (
    <Fragment>
        <section className='contact1CustomStyle'>
            <div className='contact2CustomStyle'>
                <h1 style={{color: "white"}}>Contact - BuyMySourceCode</h1>
            </div>
        </section>
        <section>
            <div>
                <h2 className='contact3CustomStyle'>Get in touch</h2>
                <p className='contact4CustomStyle'>if you have any query or give us your suggestions which you think can make our services or products better for you. Just complete your details and we’ll contact you shortly.</p>
            </div>
            <div className='contact5CustomStyle'>
                <Form
                    // {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                    }}
                >
                    <Form.Item label="Name" rules={[{ required: true }]}>
                        <Input id='contactInput1' />
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ required: true }]}>
                        <Input id='contactInput2' />
                    </Form.Item>
                    <Form.Item label="Subject" rules={[{ required: true }]}>
                        <Input id='contactInput3' />
                    </Form.Item>
                    <Form.Item label="TextArea" rules={[{ required: true }]}>
                        <TextArea rows={4} id='contactTextArea1' />
                    </Form.Item>
                    <Form.Item 
                        {...buttonItemLayout}
                    >
                        <Button type="primary" style={{background: "linear-gradient(to right, #FF416C, #FF4B2B)", borderRadius: "50px", padding: "10px 50px", height: "60px"}}>Send Message</Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
        <section className='contact6CustomStyle'>
            <Row>
                <Col lg={7} className='contact8CustomStyle'>
                    <AiOutlineMail style={{color: "white", backgroundImage: "linear-gradient(180deg, #FF416C 0%, #FF4B2B 180%)"}} />
                    <h5 className='contact7CustomStyle'>Email Address</h5>
                    <p className='contact7CustomStyle'>support@findmeapps.com</p>
                </Col>
                <Col lg={7} style={{margin: "0px 30px"}} className='contact8CustomStyle'>
                    <FaPhoneAlt  />
                    <h5 className='contact7CustomStyle'>Phone Number</h5>
                    <p className='contact7CustomStyle'>+91 90 99 91 94 93</p>
                </Col>
                <Col lg={7} className='contact8CustomStyle'>
                    <FaMap  />
                    <h5 className='contact7CustomStyle'>Office Location</h5>
                    <p className='contact7CustomStyle'>Gujarat 360005</p>
                </Col>
            </Row>
        </section>
    </Fragment>
  )
}

export default ContactComponent;
