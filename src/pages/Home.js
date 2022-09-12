import {Button, Carousel, Col, Grid, Image, Row, Typography} from "antd";
import {AppProductCardDemo} from "../component/AppProductCard";
import {useEffect, useState} from "react";
import apiClient from "../shared/apiClient";
import {handleError} from "../shared/handleError";

const productData = [
    {
        id: '1',
        name: 'bilal',
        image: 'https://www.sellmyapp.com/wp-content/uploads/thumbnail_image61108e3bf1214.png',
        price: '$10',
        url: 'https://www.sellmyapp.com/downloads/category/unity/'
    }
 ]

export const Home = () => {

    const arr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 40))
    const [sliderImages, setSliderImages] = useState()

    useEffect(() => apiClient(`get-slider`).then(r => setSliderImages(r.data)).catch(e => console.log(handleError(e))),[])

    return (
        <>
            <Carousel autoplay adaptiveHeight={true}>
                {sliderImages && sliderImages.map(v => <div>
                        <Image src={v.url} preview={false}/>
                </div>)}
            </Carousel>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Flash sales & limited offers</Typography.Title>
            </div>
                <Row gutter={[20, 15]} justify="center">
                    {arr && arr.map((v,index) => <Col xl={6}>
                            <AppProductCardDemo data={productData[0]} />
                        </Col>
                    )}
                </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Top trending templates</Typography.Title>
            </div>
            <Row gutter={[20, 15]} justify="center">
                {arr && arr.map((v,index) => <Col xl={6}>
                        <AppProductCardDemo data={productData[0]} />
                    </Col>
                )}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Most popular this month</Typography.Title>
            </div>
            <Row gutter={[20, 15]} justify="center">
                {arr && arr.map((v,index) => <Col xl={6}>
                        <AppProductCardDemo data={productData[0]} />
                    </Col>
                )}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Most popular this year</Typography.Title>
            </div>
            <Row gutter={[20, 15]} justify="center">
                {arr && arr.map((v,index) => <Col xl={6}>
                        <AppProductCardDemo data={productData[0]} />
                    </Col>
                )}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Most popular of all times</Typography.Title>
            </div>
            <Row gutter={[20, 15]} justify="center">
                {arr && arr.map((v,index) => <Col xl={6}>
                        <AppProductCardDemo data={productData[0]} />
                    </Col>
                )}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>

            <div style={{ margin: "5vh 0" }}>
                <Typography.Title type="secondary" level={2}>Newest</Typography.Title>
            </div>
            <Row gutter={[20, 15]} justify="center">
                {arr && arr.map((v,index) => <Col xl={6}>
                        <AppProductCardDemo data={productData[0]} />
                    </Col>
                )}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" >VIEW ALL APPS</Button>
            </div>
        </>
    )
}