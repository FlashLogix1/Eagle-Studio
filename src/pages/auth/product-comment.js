import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Button, Col, List, Row, Typography} from "antd";
import apiClient from "../../shared/apiClient";
import {handleError} from "../../shared/handleError";
import {useSelector} from "react-redux";
import {UserReducer} from "../../reducers/user-reducer";
import {TextArea} from "../../component/TextArea";
import {Comments} from "../../component/Comments";
import {saveData} from "../../actions/common";
import {AppProductCard} from "../../component/AppProductCard";


export const ProductComment = () => {

    const [error, setError] = useState()
    const [data, setData] = useState()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState()
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const userState = useSelector(state => state.UserReducer)

    useEffect(() => {
        apiClient(`${id}/get-comment-product`).then(r => {
            setData(r.data.data)
            setComments(r.data?.data?.comments)
        }).catch(e => setError(handleError(e)))
    },[id])

    useEffect(() => console.log(data),[data])

    const reply = (obj, replyComment) => {
        obj = {...obj, comment: replyComment}
        saveData(`${id}/reply-comment`,obj).then(r => {
            setComments(r.data)
        }).catch(e => setError(handleError(e)))
    }

    const onSubmit = () => {
        setLoading(true)
        saveData(`${id}/comment`, {comment: comment}).then(r => {
            setComments(r.data)
            setLoading(false)
            setComment('')
        }).catch(e => {
            setError(handleError(e))
            setLoading(false)
        })
    }

    return(<div>
        <Typography.Title level={6}>Discussion with {userState?.message?.username}</Typography.Title>
        <div>
            <Typography.Text strong>Subject: Question about {data?.title}</Typography.Text>
        </div>
        <div style={{marginTop: "20px"}}>
            <Typography.Text type="danger" strong>** THIS CONVERSATION IS PUBLIC — It is displayed in the comments section of the product page. Please avoid providing personal contact information.</Typography.Text>
        </div>
        <Row gutter={[20, 10]}>
            <Col xl={{span: 18}} lg={{span: 18}} md={{span: 18}} sm={{span: 24}} flex={3}>
                <div style={{marginTop: "20px"}}>
                    <TextArea value={comment} setValue={setComment} />
                </div>

                <div style={{float: "right", marginTop: "20px"}}>
                    <Button type="primary" onClick={() => onSubmit()} >Save Comment</Button>
                </div>

                <div style={{marginTop: "40px"}} >
                    {comments.length > 0 &&
                    <List
                        className="comment-list"
                        itemLayout="horizontal"
                        loading={loading}
                        dataSource={comments}
                        renderItem={(item) => (
                            <li>
                                <Comments item={item} reply={reply} replyComment={false}>
                                    {item.children?.length > 0 && item.children.map(v => <Comments item={v} reply={reply} replyComment={true} />  )}
                                </Comments>
                            </li>
                        )}
                    />
                    }
                </div>
            </Col>
            <Col  flex={2} xl={{span: 4}} lg={{span: 4}} md={{span: 4}} sm={{span: 24}} style={{marginTop: "20px"}}>
                <AppProductCard product={data} id={data?.id} />
            </Col>
        </Row>
    </div>)
}