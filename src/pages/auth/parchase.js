import {Button, Input, Modal, Progress, Skeleton, Space, Table, Tag, Tooltip, Typography, Card} from "antd";
import {CloseOutlined, EditOutlined, EyeOutlined, ThunderboltTwoTone} from "@ant-design/icons";
import apiClient from "../../shared/apiClient";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import JsFileDownloader from "js-file-downloader";
import {readLS} from "../../shared/LS";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {TextArea} from "../../component/TextArea";
import axios from "axios";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';


const getPurchase = (setOrder, setLoading) => {
    apiClient('purchase').then(r => {
        setLoading(false)
        if(r.status){
            setOrder(r.data.data)
        }
    }).catch(e => {
        setLoading(false)
        if(!handleError(e).status)
            openNotificationWithIcon("error", handleError(e).errMess)
    })
}


export const Parchase = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [purchase, setPurchase] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState()
    const [percentage, setPercentage] = useState(0)

    useEffect(() => getPurchase(setPurchase, setLoading),[])

    const download = id => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/product-download/${id}`,null, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${readLS('findMeToken')}`,
                "Access-Control-Allow-Origin": true,
                Accept: "application/zip",
            },
            responseType: "arraybuffer",
            onDownloadProgress: (progressEvent) => setPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        })
            .then(response => {
                const path= window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = path;
                link.setAttribute('download', 'file(findMeApps).rar');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                openNotificationWithIcon('eror',handleError(err));
            });
    }

    const ratingChanged = (rating, product) => {
        apiClient.post(`${product.id}/productRating`, {rating}).then(r => {
            openNotificationWithIcon("success",r.data.message)
        }).catch(e => setError(handleError(e)))
    }

    const saveMessage = (msg, product) => {

        apiClient.post(`${product.id}/product-rating-message`, {message: msg}).then(r => {
            openNotificationWithIcon("success",r.data.message)
        }).catch(e => setError(handleError(e)))
    }

    const ratingModal = product => {
        apiClient(`${product[0].id}/productRating`).then(r => {
            if(r.data.data?.rating){
                alreadyRated(r.data.data)
            } else {
                giveRating(0, product)
            }
        }).catch(e => {
            setError(handleError(e))
        })
    }

    const giveRating = (value,product) => {

        let msg = ""

        return (Modal.success({
            title: 'This is product rating',
            footer: null,
            content: <div>
                <ReactStars
                    count={5}
                    onChange={(rating) => ratingChanged(rating, product[0])}
                    size={24}
                    isHalf={true}
                    value={value}
                    edit={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
                <span>Message</span>
                <Input.TextArea onChange={(e) => {
                    msg = e.target.value
                }}/>
            </div>,
            onOk() {
                saveMessage(msg, product[0])
            },

        }))
    }

    const alreadyRated = value => (Modal.success({
        title: 'This is product already rated',
        content: <div>
            <ReactStars
                count={5}
                size={24}
                isHalf={true}
                value={value?.rating}
                edit={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            <span>Message</span>
            <Input.TextArea value={value?.message}/>
        </div>
    }))

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'order'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (<Tag color="cyan">Source Code</Tag>)
        },
        {
            title: 'Product Title',
            dataIndex: 'title',
            key: 'title',
            render:(text, record) => record.products.map(v => <div>
                <Tooltip title={`Download ${v.title}`}><Tag color="green" style={{cursor: "pointer"}} onClick={() => download(v.id)}>{v.title}</Tag></Tooltip>
                {percentage > 0 && <Progress percent={percentage} size="small"/>}
            </div>)
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text, item) => "$"+item.total
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (v, item) => <Button onClick={() => ratingModal(item?.products)}>Rating</Button>
        },
    ]

    useEffect(() => {
        if (error) openNotificationWithIcon("error", error)
    }, [error])

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return(<>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
        </div>
        <div className="site-card-border-less-wrapper" style={{width: "800px", margin: "auto", marginBottom: "60px"}}>
                <Card title={breadCrumbName} bordered={true}>
                    <Skeleton active loading={loading}>
                        <Table columns={columns} dataSource={purchase} scroll={{ x: 1100 }}/>
                    </Skeleton>            
                </Card>
        </div>
        
    </>)
}