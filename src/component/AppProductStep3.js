import {Form, message, Input, Button, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
// import Dragger from "antd/es/upload/Dragger";
import {useParams} from "react-router";
import {deleteData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {useEffect, useState} from "react";
import {readLS} from "../shared/LS";

export const AppProductStep3 = props => {

    const [errorMessageForZipFile, setErrorMessageForZipFile] = useState(false);
    const [errorMessageForPdfFile, setErrorMessageForPdfFile] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState()
    const [fileListForZip, setFileListForZip] = useState()
    const [fileListForPdf, setFileListForPdf] = useState()
    const {id} = useParams()

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const draggerProps1 = {
        accept: '.zip',
        name: 'file',
        action: `${process.env.REACT_APP_BASE_URL}/${id}/file`,
        progress: { strokeWidth: 6, showInfo: true },
        headers: {
            authorization: `Bearer ${readLS('findMeToken')}`
        },
        fileList: fileListForZip,
        onSuccess: v => setFileListForZip([{uid: v.id, ...v}]),
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove(e) {
            if(e.response) {
                if (e?.response?.id) {
                    deleteData(`/${id}/file/${e?.response?.id}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
                }
            } else {
                deleteData(`/${id}/file/${e?.uid}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
            }
        }
    }

    const draggerProps2 = {
        accept: '.pdf',
        name: 'file',
        action: `${process.env.REACT_APP_BASE_URL}/${id}/file`,
        progress: { strokeWidth: 6, showInfo: true },
        headers: {
            authorization: `Bearer ${readLS('findMeToken')}`
        },
        fileList: fileListForPdf,
        onSuccess: v => setFileListForPdf([{uid: v.id, ...v}]),
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove(e) {
            if(e.response) {
                if (e?.response?.id) {
                    deleteData(`/${id}/file/${e?.response?.id}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
                }
            } else {
                deleteData(`/${id}/file/${e?.uid}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
            }
        }
    }

    useEffect(() => {
        form.setFieldsValue(props?.product)
        if(props.product)
        {
            console.log(props.product?.file, 'custom message')
            setFileListForZip([props.product?.file])
            setFileListForPdf([props.product?.file])
        }
    },[props.product])

    const beforeUploadForZipFile = fileParam1 => 
    {
        console.log(fileParam1, 'beforeUploadForZipFile function is running');
        
        const file = fileParam1.name;
        const fileExtension = file.substring(file.lastIndexOf(".")+1);
        if(fileExtension === "zip") 
        {
            setErrorMessageForZipFile(false);
            return fileParam1;
        }
        else 
        {
            console.log('Given file is not a zip file');
            setErrorMessageForZipFile(true);
            return Upload.LIST_IGNORE;
        }
    }

    const beforeUploadForPdfFile = fileParam1 => 
    {
        console.log(fileParam1, 'beforeUploadForPdfFile function is running');
        
        const file = fileParam1.name;
        const fileExtension = file.substring(file.lastIndexOf(".")+1);
        if(fileExtension === "pdf") 
        {
            setErrorMessageForPdfFile(false);
            return fileParam1;
        }
        else 
        {
            console.log('Given file is not a pdf file');
            setErrorMessageForPdfFile(true);
            return Upload.LIST_IGNORE;
        }
    }

    return(<div>
        <Form form={form} {...layout} name="control-hooks" onFinish={(v) => props.next(v)}>

            <Form.Item label="Product ZIP file:" rules={[{ required: true }]}>
                <Upload.Dragger {...draggerProps1} beforeUpload={beforeUploadForZipFile} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Upload.Dragger>
                {
                    errorMessageForZipFile && (<span style={{color: "red"}}>Given file is not a zip file</span>)
                }
            </Form.Item>
            

            <Form.Item label="Product PDF file:" rules={[{ required: true }]}>
                <Upload.Dragger {...draggerProps2} beforeUpload={beforeUploadForPdfFile} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Upload.Dragger>
                {
                    errorMessageForPdfFile && (<span style={{color: "red"}}>Given file is not a pdf file</span>)
                }
            </Form.Item>

            <Form.Item label="Price suggestion"></Form.Item>

            <Form.Item name="single_app_license" label="Single app license ($)">
                <Input style={{marginLeft: "10px"}} />
            </Form.Item>

            <Form.Item name="multi_app_license" label="Multiple app license ($)">
                <Input style={{marginLeft: "10px"}} />
            </Form.Item>

            {/* <Form.Item name="reskinned_app_license" label="Reskinned app license ($)">
                <Input style={{marginLeft: "20px"}} />
            </Form.Item> */}

            <Form.Item name="development_hours" label="Development hours">
                <Input style={{marginLeft: "10px"}} />
            </Form.Item>

            <Form.Item colon={false} label={<Button onClick={() => props.prev()} size={"large"} >Previous</Button>}>
                <Button type="primary" htmlType="submit" size={"large"} style={{float: 'right'}}>
                    Done
                </Button>
            </Form.Item>
        </Form>

    </div>)
}