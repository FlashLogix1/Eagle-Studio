import {Steps, Typography} from "antd";
import {AppPorductStep1} from "../../component/AppPorductStep1";
import {AppProductStep2} from "../../component/AppProductStep2";
import {AppProductStep3} from "../../component/AppProductStep3";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getDataByID, getProductByID, updateData} from "../../actions/common";
import {handleError} from "../../shared/handleError";

const steps = [
    {
        title: 'Product details',
        content: 'First-content',
        step: 1
    },
    {
        title: 'Images & Videos',
        content: 'Second-content',
        step: 2,
    },
    {
        title: 'Files & Pricing',
        content: 'Last-content',
        step: 3,
    },
];

export const EditProductStep2 = () => {

    const [current, setCurrent] = useState(0);
    const history = useHistory()
    const {id} = useParams()
    const [error, setError] = useState()
    const [product, setProduct] = useState()

    const next = (v) => {
        updateData(`/product/${id}`, v).then(r => typeof(r.data) == "object" && history.push(`/edit-product/step3/${id}`)).catch(e => setError(handleError(e)))
    };

    useEffect(() => {
        getProductByID(`/get-product/${id}`).then(r => {
            setProduct({
                featured_image: r.data?.featured_image?.url,
                screenshots: r.data?.screenshots.map(v => ({url: v.url, uid: v.id, name: v.name, status: 'done'})),
                thumbnail_image: r.data?.thumbnail_image?.url,
                youtube_link: r.data?.youtube_link,
                google_play_link: r.data?.google_play_link,
                app_store_link: r.data?.app_store_link,
            })
        }).catch(e => setError(handleError(e)))
    },[])

    const prev = () => {
        history.push(`/edit-product/${id}`)
    };

    return(<>
        <Typography>Edit product# {id}</Typography>
        <Steps current={1}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
            ))}
        </Steps>
        <div className="steps-content">
            <AppProductStep2 next={next} current={current} prev={prev} product={product} />
        </div>
    </>)
}