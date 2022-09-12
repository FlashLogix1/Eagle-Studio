import {Col, Row, Typography} from "antd";


export const SignUpMessage = () => {

    return (<div>
        <Row justify="center">
            <Col>
                <Typography.Text style={{color: "green", fontSize: "30px"}}>Thanks for singing up to Find me apps!</Typography.Text>
            </Col>
            <Col style={{marginTop: "20px"}}>
                <Typography.Text>Your password was sent to the email address you provide. Please check your spam folder as well since sometimes it might appear there!</Typography.Text>
            </Col>
        </Row>
    </div>)
}