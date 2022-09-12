import {Card, Rate} from "antd";
import {DiAndroid} from "react-icons/all";


export const AppCard = (props) => {

    const {
        data
    } = props

    return (
        <Card
            hoverable
            cover={<a href={data.url}>
                <span className="price-tag">{data.price}</span>
                <img alt="example" src={data.image} /> </a>}
        >
            <span style={{marginLeft: '-19px'}}><DiAndroid /> Android <span style={{float: 'right', marginRight: '-19px'}}><Rate /></span></span>
        </Card>
    )
}