import {Steps, Typography} from "antd";
import {AppPorductStep1} from "../../component/AppPorductStep1";
import {AppProductStep2} from "../../component/AppProductStep2";
import {AppProductStep3} from "../../component/AppProductStep3";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getDataByID, getProductByID, updateData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {openNotificationWithIcon} from "../../shared/notification";

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

export const EditProductStep3 = () => {

    const [current, setCurrent] = useState(2);
    const history = useHistory()
    const [error, setError] = useState()
    const [product, setProduct] = useState()
    const {id} = useParams()

    const next = (v) => {
        // history.push()
        v = {...v, step3: 'step3'}
        updateData(`/product/${id}`, v).then(r => typeof(r.data) == "object" && history.push(`/product-added`)).catch(e => setError(handleError(e)))
    };

    useEffect(() => {
        if (error && error != null && error != "" && error != "Cannot read properties of null (reading 'url')") {
            openNotificationWithIcon("error", error)
        }
    },[error])

    const prev = () => {
        history.push(`/edit-product/step2/${id}`)
    };

    useEffect(() => {
        getProductByID(`/get-product/${id}`).then(r => {
            setProduct({
                single_app_license: r.data?.single_app_license,
                development_hours: r.data?.development_hours,
                multi_app_license: r.data?.multi_app_license,
                reskinned_app_license: r.data?.reskinned_app_license,
                file: {url: r.data?.file.url, uid: r.data?.file.id, name: r.data?.file.name, status: 'done', size: r.data?.file.size, path: r.data?.file?.path}
            })
        }).catch(e => setError(handleError(e)))
    },[])

    return(<>
        <Typography>Edit product# {id}</Typography>
        <Steps current={2}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
            ))}
        </Steps>
        <div className="steps-content">
            <AppProductStep3 next={next} current={current} prev={prev} product={product} />
        </div>
    </>)
}