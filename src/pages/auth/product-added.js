import {Button, Card, Space, Typography} from "antd";
import {Link} from "react-router-dom";


export const ProductAdded = () => {

    return (<>

        <Card title="Product has been updated" style={{ width: "800px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "60px"}}>
            <Typography.Text style={{color: "green", fontSize: "30px"}}>Your changes were successfully updated!</Typography.Text>
            <br />
            <Typography.Text>Please wait for approval from admin. when admin approved product shows </Typography.Text>
            <br />
            <Typography.Text>What would you like to do next?</Typography.Text>

            <div style={{marginTop: "30px"}}>
                <Space>
                    <span><Link to="add-product"><Button shape="round">Add Another Product</Button></Link></span>
                    <span><Link to="products"><Button type="primary" shape="round">View My Product</Button></Link></span>
                </Space>
            </div>
        </Card>
    </>)
}