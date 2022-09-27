import React, { Fragment, useState } from 'react';
import { Button, Form, Input } from 'antd';

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
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Subject" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="TextArea" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item 
                        {...buttonItemLayout}
                    >
                        <Button type="primary" style={{background: "linear-gradient(to right, #FF416C, #FF4B2B)", borderRadius: "50px", padding: "10px 50px", height: "60px"}}>Send Message</Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    </Fragment>
  )
}

export default ContactComponent;
