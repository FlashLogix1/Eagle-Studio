// Sumair editing in src => pages => auth => message.js
import {useContext, useEffect, useState, Fragment} from "react";
import {getData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {APIContext} from "../../context/context";
import {Card, Table} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';


export const Message = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const {loginResponse, setCartState} = useContext(APIContext)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [, setError] = useState(true)

    useEffect(() => {
        if(loginResponse?.user) {
            setLoading(true)
            getData(`cart/${loginResponse.user.id}`).then(r => {
                setCartState(r.data)
                setLoading(false)
            }).catch(e => {
                setError(handleError(e))
                setLoading(false)
            })
            getData(`fetch-messages `).then(r => {
                setMessages(r.data.data)
                setLoading(false)
            }).catch(e => {
                setError(handleError(e))
                setLoading(false)
            })
        }
    },[loginResponse])

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
        getData(`fetch-messages`).then(r => {
            setMessages(r.data.data)
            setLoading(false)
        }).catch(e => {
            setError(handleError(e))
            setLoading(false)
        })
    },[])

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key : "username",
            render: (a, item) => (<Link to={`user-Profile/${item.user.id}`}><UserOutlined />{item.user.username}</Link>)
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key : "subject",
            render: (a, item) => (<Link to={`product-comments/${item.product.id}`}>{item.product.title}</Link>)

        },
        {
            title: "Send/Received",
            dataIndex: "created_at",
            key : "created_at"
        },
    ]

    return(
    <Fragment>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <div style={{paddingLeft: "127px"}}>
                <AppBreadcrumb name={breadCrumbName} />
            </div>
        </div>
        <div className="site-card-border-less-wrapper">
            <Card title="Messages" style={{width: "800px", margin: "auto", marginBottom: "60px"}}>
                <Table columns={columns} dataSource={messages} loading={loading} scroll={{x: 700}} size="middle" />
            </Card>
        </div>
    </Fragment>
    )
}