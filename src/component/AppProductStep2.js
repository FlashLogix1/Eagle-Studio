// Sumair editing in src => component AppProductStep2.js
import {Button, Form, Input, Upload, message} from "antd";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useParams} from "react-router";
import {deleteData} from "../actions/common";
import {handleError} from "../shared/handleError";
import ImgCrop from 'antd-img-crop';
import {readLS} from "../shared/LS";
import {useHistory} from "react-router";
import apiClient from "../shared/apiClient";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

export const AppProductStep2 = (props) => {

    const history = useHistory()
    const [fileList, setFileList] = useState([])
    const [image, setImage] = useState()
    const [, setError] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [, setLoading] = useState(false)
    const [form] = Form.useForm();
    const {id} = useParams()
    const [errorMessageForFeaturedImage, setErrorMessageForFeaturedImage] = useState(false);
    const [errorMessageForThumbnailImage, setErrorMessageForThumbnailImage] = useState(false);
    const [errorMessageForScreenshot, setErrorMessageForScreenshot] = useState(false);

    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'JPG' || file.type === 'png';
    //     setLoading(true)
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    // }
    const beforeUploadForFeaturedImage = file =>  {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', event => {
          const _loadedImageUrl = event.target.result;
          const image = document.createElement('img');
          image.src = _loadedImageUrl;
          image.addEventListener('load', () => {
            const { width, height } = image;
            // set image width and height to your state here
            console.log(width, height, 'uploaded image width and height');
            if(width > 650)
            {
                image.width = 650;
            }
            if(height > 290)
            {
                image.height = 290;
            }
            console.log(image.width, image.height, 'now image has width and height');
            console.log(image, 'resized image');
            return image;
          });
        });
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // console.log(isJpgOrPng, 'custom message isJpgOrPng');
        // console.log(file, 'original file');
        // return isJpgOrPng;
      }

      const beforeUploadForThumbnailImage = file =>  {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', event => {
          const _loadedImageUrl = event.target.result;
          const image = document.createElement('img');
          image.src = _loadedImageUrl;
          image.addEventListener('load', () => {
            const { width, height } = image;
            // set image width and height to your state here
            console.log(width, height, 'uploaded image width and height');
            if(width > 200)
            {
                image.width = 200;
            }
            if(height > 140)
            {
                image.height = 140;
            }
            console.log(image.width, image.height, 'now image has width and height');
            console.log(image, 'resized image');
            return image;
          });
        });
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // console.log(isJpgOrPng, 'custom message isJpgOrPng');
        // console.log(file, 'original file');
        // return isJpgOrPng;
      }

    const handleChange = (info) => {
        if(info.file.response)
        {
            setImage(info.file.response.url);
            setErrorMessageForFeaturedImage(false);
        }

        // if (info.file.status === 'error')
        //     message.error(handleError(info.file.response.errors))
        setLoading(false)
    }

    const handleChangeScreenShot = ({ fileList }) => {
        setFileList(fileList);
        setErrorMessageForScreenshot(false);
    }

    const onRemove = (e) => {
        console.log(e)
        if(e.response) {
            if (e?.response[0]?.id) {
                deleteData(`/${id}/screenshot/${e?.response[0]?.id}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
            }
        } else {
            deleteData(`/${id}/screenshot/${e?.uid}`).then(res => console.log(res.data)).catch(err => setError(handleError(err)))
        }
    }

    useEffect(() => {
        form.setFieldsValue(props?.product)
        setImage(props?.product?.featured_image)
        setThumbnail(props?.product?.thumbnail_image)
        setFileList(props?.product?.screenshots)
    },[props.product])

    const handleThumbnailImage = info => {
        if(info.file.response)
        {
            setThumbnail(info.file.response.url);
            setErrorMessageForThumbnailImage(false);
        }
        setLoading(false)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // onFinish={(v) => props.next(v)}
    // onFinish={(v) => history.push(`/edit-product/step3/${id}`)}

    return (<div>
        <Form form={form} {...layout} onFinish={(v) => {
            if(image === undefined) setErrorMessageForFeaturedImage(true);
            if(thumbnail === undefined) setErrorMessageForThumbnailImage(true);
            if(fileList.length === 0) setErrorMessageForScreenshot(true);
            if(image !== undefined && thumbnail !== undefined && fileList.length !== 0)
            {
                setErrorMessageForFeaturedImage(false);
                setErrorMessageForThumbnailImage(false);
                setErrorMessageForScreenshot(false);
                props.next(v);
            }
        }}>

            <Form.Item name="featured_image" label="Featured image" extra="Should be exactly 650x290" >
                {/*<ImgCrop rotate aspect={650/290}>*/}
                    <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        headers={{
                            authorization: `Bearer ${readLS('findMeToken')}`
                        }}
                        action={`${process.env.REACT_APP_BASE_URL}/${id}/featuredImage`}
                        beforeUpload={beforeUploadForFeaturedImage}
                        onChange={handleChange}
                        // onChange={handleChangeScreenShot}
                        method="post"
                        transformFile={(file) =>  {
                            try {
                                console.log(file);
                            }
                            catch (e){
                                console.log(e);
                            }
                        }}
                        // customRequest={() => apiClient.post(`${process.env.REACT_APP_BASE_URL}/${id}/featuredImage`, {file: image})}
                    >
                        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        {console.log(image, 'image image image')}
                    </Upload>
                {/*</ImgCrop>*/}
                {
                    errorMessageForFeaturedImage && <span style={{color: "red"}}>Please upload featured image</span>
                }
            </Form.Item>

            <Form.Item name="thumbnail_image" label="Thumbnail image" extra="Should be exactly 200x140">
                <Upload
                    listType="picture-card"
                    className="avatar-uploaders"
                    showUploadList={false}
                    headers={{
                        authorization: `Bearer ${readLS('findMeToken')}`
                    }}
                    action={`${process.env.REACT_APP_BASE_URL}/${id}/thumbnailImage`}
                    beforeUpload={beforeUploadForThumbnailImage}
                    onChange={handleThumbnailImage}
                >
                    {thumbnail ? <img src={thumbnail} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    {console.log(thumbnail, 'thumbnail thumbnail thumbnail')}
                </Upload>
                {
                    errorMessageForThumbnailImage && <span style={{color: "red"}}>Please upload thumbnail image</span>
                }
            </Form.Item>

            <Form.Item name="screenshots" label="Screenshots">
                <Upload
                    action={`${process.env.REACT_APP_BASE_URL}/${id}/screenshot`}
                    listType="picture-card"
                    fileList={fileList}
                    headers={{
                        authorization: `Bearer ${readLS('findMeToken')}`
                    }}
                    onChange={handleChangeScreenShot}
                    onRemove={onRemove}
                    multiple={true}
                >
                    {fileList?.length >= 20 ? null : uploadButton}
                    {console.log(fileList, 'fileList fileList fileList')}
                </Upload>
                {
                    errorMessageForScreenshot && <span style={{color: "red"}}>Please upload screenshot</span>
                }
            </Form.Item>

            <Form.Item name="youtube_link" label="Youtube link" style={{marginLeft: "30px"}}>
                <Input />
            </Form.Item>

            <Form.Item name="google_play_link" label="Google play link"  style={{marginRight: "20px"}}>
                <Input />
            </Form.Item>

            <Form.Item name="app_store_link" label="AppStore link" style={{marginLeft: "18px"}}>
                <Input />
            </Form.Item>

            <Form.Item colon={false} label={<Button onClick={()=> history.push(`/add-product`)} size={"large"} >Previous</Button>}>
                <Button type="primary" htmlType="submit" size={"large"} style={{float: 'right'}}>
                    Save & Continue
                </Button>
            </Form.Item>
        </Form>
    </div>)
}