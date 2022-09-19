// Sumair editing in src => pages => user-profile.js
import {Col, Image, Row, Skeleton, Typography} from "antd";
import {AppProductCard} from "../component/AppProductCard";
import {useEffect, useState, Fragment} from "react";
import {useParams} from "react-router";
import {getData} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";
import { AppProductCardComponent } from "../component/AppProductCard";
import '../../src/CustomStyles.css';


export const UserProfile = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        getData(`/user-detail/${id}`).then(r => setData(r.data)).catch(e => openNotificationWithIcon("error",handleError(e)))
        setLoading(false)
    }, [])

    let array1 = [
        {
            id: 1,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CatGirlSkaterUnitySourceCode_sellanycode_featured_image_1639125127.png"
        },
        {
            id: 2,
            name: "Tap Blocks Away",
            price: 25,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SnowPatrolPicker3D_sellanycode_featured_image_1643273901.jpg"
        },
        {
            id: 3,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SquidGameSniperLatestReskinnedVersion_sellanycode_featured_image_1637137582.jpg"
        },
        {
            id: 4,
            name: "Tap Blocks Away",
            price: 20,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ShooterAssassinHypercasualTrendingGame_sellanycode_featured_image_1605959231.png"
        },
        {
            id: 5,
            name: "Tap Blocks Away",
            price: 30,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ThePigEscapeUnitySourceCode_sellanycode_featured_image_1639031402.png"
        },
        {
            id: 6,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/AnimalConnectPikachuONET_sellanycode_featured_image_1607382265.jpg"
        },
        {
            id: 7,
            name: "Tap Blocks Away",
            price: 50,
            url: "https://www.sellanycode.com/system/assets/uploads/products/KnockoutStumbleRunRoyaleFallGames_sellanycode_featured_image_1633086944.png"
        },
        {
            id: 8,
            name: "Tap Blocks Away",
            price: 3,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CoinAndTheftUnitySourceCode_sellanycode_featured_image_1638994364.png"
        },
        {
            id: 9,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CatGirlSkaterUnitySourceCode_sellanycode_featured_image_1639125127.png"
        },
        {
            id: 10,
            name: "Tap Blocks Away",
            price: 25,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SnowPatrolPicker3D_sellanycode_featured_image_1643273901.jpg"
        },
        {
            id: 11,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SquidGameSniperLatestReskinnedVersion_sellanycode_featured_image_1637137582.jpg"
        },
        {
            id: 12,
            name: "Tap Blocks Away",
            price: 20,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ShooterAssassinHypercasualTrendingGame_sellanycode_featured_image_1605959231.png"
        },
        {
            id: 13,
            name: "Tap Blocks Away",
            price: 30,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ThePigEscapeUnitySourceCode_sellanycode_featured_image_1639031402.png"
        },
        {
            id: 14,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/AnimalConnectPikachuONET_sellanycode_featured_image_1607382265.jpg"
        },
        {
            id: 15,
            name: "Tap Blocks Away",
            price: 50,
            url: "https://www.sellanycode.com/system/assets/uploads/products/KnockoutStumbleRunRoyaleFallGames_sellanycode_featured_image_1633086944.png"
        },
        {
            id: 16,
            name: "Tap Blocks Away",
            price: 3,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CoinAndTheftUnitySourceCode_sellanycode_featured_image_1638994364.png"
        },
        {
            id: 17,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CatGirlSkaterUnitySourceCode_sellanycode_featured_image_1639125127.png"
        },
        {
            id: 18,
            name: "Tap Blocks Away",
            price: 25,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SnowPatrolPicker3D_sellanycode_featured_image_1643273901.jpg"
        },
        {
            id: 19,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/SquidGameSniperLatestReskinnedVersion_sellanycode_featured_image_1637137582.jpg"
        },
        {
            id: 20,
            name: "Tap Blocks Away",
            price: 20,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ShooterAssassinHypercasualTrendingGame_sellanycode_featured_image_1605959231.png"
        },
        {
            id: 21,
            name: "Tap Blocks Away",
            price: 30,
            url: "https://www.sellanycode.com/system/assets/uploads/products/ThePigEscapeUnitySourceCode_sellanycode_featured_image_1639031402.png"
        },
        {
            id: 22,
            name: "Tap Blocks Away",
            price: 27,
            url: "https://www.sellanycode.com/system/assets/uploads/products/AnimalConnectPikachuONET_sellanycode_featured_image_1607382265.jpg"
        },
        {
            id: 23,
            name: "Tap Blocks Away",
            price: 50,
            url: "https://www.sellanycode.com/system/assets/uploads/products/KnockoutStumbleRunRoyaleFallGames_sellanycode_featured_image_1633086944.png"
        },
        {
            id: 24,
            name: "Tap Blocks Away",
            price: 3,
            url: "https://www.sellanycode.com/system/assets/uploads/products/CoinAndTheftUnitySourceCode_sellanycode_featured_image_1638994364.png"
        }
    ]

    // return (<>
    //     <Typography.Title type="secondary" level={2}>User Profile</Typography.Title>
    //     <Row gutter={[15, 15]}>
    //         <Col span={6}>
    //             <Image src={data.length > 0 ? data[0]?.user?.profile_img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAAAAAAdwx7eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBw0JGhXTatJGAAAC/ElEQVRYw+3Z21biMBQG4L7/OyWltKBWlIMg4AwFRFARqy3WQ9MmU5QZXTOk2TuRu8kdF3zrX7tJupNaYm/D+k9r0flzuAiG/f4wWITP+ffReTxt1yuUkmJQWqm3pzFEV9PZquu+m79H8cPtrjJjmj90Kl/YP3yl88DN6HTk7oDfcTdITeinFi0ZrSd9OvJJGU38SJeOjkrlwj6K9OjEV8ib3IkOzTpKubA7TIOequHNmOLpdQ0QuohdW2NpPgDJhT3gSDr2YDKlXoykR8DQRewRjmbHcPqYoehHBypT6jyi6BlcpnSGoqHz42OOYOi8jaHbOYJmpxj6lCHotIGhGymCZicY+gSTOkMVpJkh6D0+RtHD0F2OoBPUY2wjCpJh6lH0UzM4jdlBqHSD2knfoGRKa09geoGk3RhML7GpEzAdVXG19lMw/aZqm/6id0/s3fO6j6LpHD75xF0FE7qeIGjczjfELHRxA48t7Z8kdHYOjm1PBIoWL9CSkCZD0uAVSQKBpUMbWI8lml67MNpFN8HQ+Sd755bR4gqWeibw9BvkJUb8Vw1aXAMepD0XOnR2pj7cnaZatIiUJyVnJfRo5flOfkRS0qy8aSCHidClRVwvs+2F0KfFvGSWkLPMhM77crkWCxNavEivF+ypMKPFUHZB1GKmdCBLfaX6p5K+lNX6xpi+ltG3xvTt/mhpa2leEGnqhTEtfbNfGtMT2WIcmdJc1kaRnul1bSA9MVXHzIDmYdl1rd2JdGm+HlTLXwXe+FWH5vGFp+4W/HmKpdmq50K6J2Ifz14RNH+eNSvQ/prQo3ECPCax+8EBxRyTCKkN7jMlzdeThkNw56+N7jTnL7yMfrvteqjAX+tycPGQSWgeB76t527rsom+g/74sKMPb6Mf/vz80PRBZ8uWY+puo3vnYf5J88cOeK4BdKcb8i3NJqDVgcCrg+SdZn1z7B/88K6g+Y/vlzc711JYIe5aBWwfrK3RXuRijC3MPSQqds/C3EOi6IYF/v6CHd4vNEnMDvXbQPwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDctMTNUMDk6MjY6MjEtMDQ6MDCHQinlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA3LTEzVDA5OjI2OjIxLTA0OjAw9h+RWQAAAABJRU5ErkJggg=="} width={180} height={180}/>
    //         </Col>
    //         <Col span={8}>
    //             <Typography.Text>{data.length > 0 && data[0]?.user?.username}</Typography.Text>
    //             <Typography.Paragraph>{data.length > 0 && data[0]?.user?.become_seller[0]?.developer_type?.replaceAll("_", " ").toUpperCase()}</Typography.Paragraph>
    //         </Col>
    //         <Col span={10}>
    //             <Typography.Text>Member since:</Typography.Text>
    //             <Typography.Text> {data.length > 0 && data[0]?.user?.created_at}</Typography.Text>
    //             <br />
    //             <Typography.Text>Developing experience:</Typography.Text>
    //             <Typography.Text>{data.length > 0 && data[0]?.user?.become_seller[0]?.development_experience}</Typography.Text>
    //         </Col>
    //     </Row>
    //     <Row  gutter={[10, 10]} style={{marginTop: "10px"}}>
    //         <Col span={24}>
    //             <Typography.Title type="secondary" level={2}>Products</Typography.Title>
    //         </Col>
    //         <Col xs={24} sm={24} md={18} lg={24} xl={24}>
    //             <Row gutter={[10, 10]} >
    //                 <Skeleton active loading={loading}>
    //                     {data && data.map(v => <Col key={v.id}>
    //                             <AppProductCard product={v} id={v.id} />
    //                         </Col>
    //                     )}
    //                 </Skeleton>
    //             </Row>
    //         </Col>
    //     </Row>
    // </>)
    return (
        <Fragment>
            <div className="userProfileHeadCustomStyle">
                <div class="containerCustomStyle"> 
                    <div class="authorInfoRowCustomStyle"> 
                        <div class="firstColumnCustomStyle"> 
                            <img src="/z1.jpg" alt="" height="120" width="120" class="avatar" style={{borderRadius: "50%"}} /> 
                            <div class="authorTitleCustomStyle"> 
                                <div class="nameCustomStyle"> EcanTUBE </div> 
                                <div class="typeCustomStyle"> Development Agency </div> 
                                <a class="buttonCustomStyle buttonSuccessCustomStyle" href="https://www.sellanycode.com/user/register.php" target="_blank" style={{marginTop: "10px"}}>Contact this author</a> 
                            </div> 
                        </div> 
                        <div class="secondColumnCustomStyle"> 
                            <div style={{lineHeight: "40px"}}> Member since: <strong>October 06, 2021</strong> </div> 
                            <div style={{lineHeight: "30px"}}> Expert in: <strong>Android, Unity</strong> </div> 
                            <div style={{lineHeight: "40px"}}> Developing experience: <strong>more than 5 years</strong> </div> 
                        </div> 
                    </div> 
                </div>
            </div>
            <div className="productsCustomStyle">
                Products
            </div>
            <Row  gutter={[10, 10]} style={{marginTop: "10px"}}>
            {
                array1 && array1.map(itemParam1 => <Col key={itemParam1.id} xs={24} sm={24} md={12} lg={6} xl={6}>
                    <AppProductCardComponent id={itemParam1.id} name={itemParam1.name} price={itemParam1.price} url={itemParam1.url} />                            </Col>
                )       // map ends here
            }
            </Row>
        </Fragment>
    )
}