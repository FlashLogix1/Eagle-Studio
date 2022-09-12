import image from "../assets/thumbnail_image613c1a2c879bb.png"
import {SiUnity} from "react-icons/all";
import {Link} from "react-router-dom";
import {Image} from "antd";

export const ProductReskinnedCard = (props) => {
    return(
    <div className="product-box-column">
        <article className="list-product">
            <div className="image-container">
                <Link to={`/product-detail/${props.id}`}>
                    <span className='price-tag'>{props.product?.single_app_license}</span><Image src={"https://www.sellmyapp.com/wp-content/uploads/thumbnail_image6180f6a3efe32.png"} alt="Product Image" width={200} height={140} />
                </Link>
            </div>
            <div className="product-label">
                <div style={{ float: 'left', marginTop: '5px' }}>
                    <SiUnity /> Unity -
                </div>
                <div className="reskkined-product"> jelly  Match Match MatchMatchMatch< /div>
            </div>
        </article>
    </div>
    )
}