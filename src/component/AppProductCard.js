import {Image} from "antd";
import {Link} from "react-router-dom";
import {SiUnity} from "react-icons/all"
import unity from "../assets/unity.png"
import android from "../assets/android.png"
import ios from "../assets/ios.png"
import ReactStars from "react-rating-stars-component/dist/react-stars";

const icon = {
    android: android,
    unity: unity,
    ios: ios
}

export const AppProductCard = (props) => {
  return(
      <div className="product-box-column">
          <article className="list-product">
              <div className="image-container">
                  <Link to={`/product-detail/${props.id}`}>
                      <span className='price-tag'>${props.product?.single_app_license}</span>
                      <Image src={props.product?.thumbnail_image?.url} alt="Product Image" width={200} height={140} />
                  </Link>
              </div>
              <div className="product-label">
                  <div style={{ float: 'left' }}>
                      <Image preview={false} src={icon[props?.product?.product_category?.icon]} width={20} height={20}/> {props?.product?.product_category?.name}
                  </div>
                  <div className="rating no-rating" style={{ fontSize: '15px', float: 'right' }}>
                      <ReactStars
                          count={5}
                          value={props.product?.product_rating_avg_rating != null ? props.product?.product_rating_avg_rating : 0}
                          size={16}
                          edit={false}
                          isHalf={true}
                          color2={'#ffd700'} />
                  </div>
              </div>
          </article>
      </div>
  )
}

export const  AppProductCardDemo = (props) => {

    return(
        <div className="product-box-column">
            <article className="list-product">
                <div className="image-container">
                    <Link to={`/product-detail/${props.data.id}`}>
                        <span className='price-tag'>${props.data.price}</span>
                        <Image src={props.data.image} alt="Product Image" width="100%" height="100%" />
                    </Link>
                </div>
                <div className="product-label">
                    <div style={{ float: 'left' }}>
                        <Image src={ios} width={20} height={20}/> Unity
                    </div>
                    <div className="rating no-rating" style={{ fontSize: '15px', float: 'right' }}>☆☆☆☆☆</div>
                </div>
            </article>
        </div>
    )
}