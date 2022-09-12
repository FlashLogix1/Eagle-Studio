import {Col, Image, Row, Skeleton, Typography} from "antd";
import {AppProductCard} from "../component/AppProductCard";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";


export const UserProfile = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        getData(`/user-detail/${id}`).then(r => setData(r.data)).catch(e => openNotificationWithIcon("error",handleError(e)))
        setLoading(false)
    }, [])

    return (<>
        <Typography.Title type="secondary" level={2}>User Profile</Typography.Title>
        <Row gutter={[15, 15]}>
            <Col span={6}>
                <Image src={data.length > 0 ? data[0]?.user?.profile_img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAAAAAAdwx7eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBw0JGhXTatJGAAAC/ElEQVRYw+3Z21biMBQG4L7/OyWltKBWlIMg4AwFRFARqy3WQ9MmU5QZXTOk2TuRu8kdF3zrX7tJupNaYm/D+k9r0flzuAiG/f4wWITP+ffReTxt1yuUkmJQWqm3pzFEV9PZquu+m79H8cPtrjJjmj90Kl/YP3yl88DN6HTk7oDfcTdITeinFi0ZrSd9OvJJGU38SJeOjkrlwj6K9OjEV8ib3IkOzTpKubA7TIOequHNmOLpdQ0QuohdW2NpPgDJhT3gSDr2YDKlXoykR8DQRewRjmbHcPqYoehHBypT6jyi6BlcpnSGoqHz42OOYOi8jaHbOYJmpxj6lCHotIGhGymCZicY+gSTOkMVpJkh6D0+RtHD0F2OoBPUY2wjCpJh6lH0UzM4jdlBqHSD2knfoGRKa09geoGk3RhML7GpEzAdVXG19lMw/aZqm/6id0/s3fO6j6LpHD75xF0FE7qeIGjczjfELHRxA48t7Z8kdHYOjm1PBIoWL9CSkCZD0uAVSQKBpUMbWI8lml67MNpFN8HQ+Sd755bR4gqWeibw9BvkJUb8Vw1aXAMepD0XOnR2pj7cnaZatIiUJyVnJfRo5flOfkRS0qy8aSCHidClRVwvs+2F0KfFvGSWkLPMhM77crkWCxNavEivF+ypMKPFUHZB1GKmdCBLfaX6p5K+lNX6xpi+ltG3xvTt/mhpa2leEGnqhTEtfbNfGtMT2WIcmdJc1kaRnul1bSA9MVXHzIDmYdl1rd2JdGm+HlTLXwXe+FWH5vGFp+4W/HmKpdmq50K6J2Ifz14RNH+eNSvQ/prQo3ECPCax+8EBxRyTCKkN7jMlzdeThkNw56+N7jTnL7yMfrvteqjAX+tycPGQSWgeB76t527rsom+g/74sKMPb6Mf/vz80PRBZ8uWY+puo3vnYf5J88cOeK4BdKcb8i3NJqDVgcCrg+SdZn1z7B/88K6g+Y/vlzc711JYIe5aBWwfrK3RXuRijC3MPSQqds/C3EOi6IYF/v6CHd4vNEnMDvXbQPwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDctMTNUMDk6MjY6MjEtMDQ6MDCHQinlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA3LTEzVDA5OjI2OjIxLTA0OjAw9h+RWQAAAABJRU5ErkJggg=="} width={180} height={180}/>
            </Col>
            <Col span={8}>
                <Typography.Text>{data.length > 0 && data[0]?.user?.username}</Typography.Text>
                <Typography.Paragraph>{data.length > 0 && data[0]?.user?.become_seller[0]?.developer_type?.replaceAll("_", " ").toUpperCase()}</Typography.Paragraph>
            </Col>
            <Col span={10}>
                <Typography.Text>Member since:</Typography.Text>
                <Typography.Text> {data.length > 0 && data[0]?.user?.created_at}</Typography.Text>
                <br />
                <Typography.Text>Developing experience:</Typography.Text>
                <Typography.Text>{data.length > 0 && data[0]?.user?.become_seller[0]?.development_experience}</Typography.Text>
            </Col>
        </Row>
        <Row  gutter={[10, 10]} style={{marginTop: "10px"}}>
            <Col span={24}>
                <Typography.Title type="secondary" level={2}>Products</Typography.Title>
            </Col>
            <Col xs={24} sm={24} md={18} lg={24} xl={24}>
                <Row gutter={[10, 10]} >
                    <Skeleton active loading={loading}>
                        {data && data.map(v => <Col key={v.id}>
                                <AppProductCard product={v} id={v.id} />
                            </Col>
                        )}
                    </Skeleton>
                </Row>
            </Col>
        </Row>
    </>)
}