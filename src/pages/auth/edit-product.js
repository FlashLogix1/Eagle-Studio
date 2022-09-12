import {Steps, Typography} from "antd";
import {AppPorductStep1} from "../../component/AppPorductStep1";
import {createContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getDataByID, getProductByID, updateData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {ProductReducer, ProductState, useProductState} from "../../component/ProductState";

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

export const EditProduct = () => {

    const [current, setCurrent] = useState(0);
    const [product, setProduct] = useState()
    const [error, setError] = useState()
    const [state, dispatch] = ProductReducer()

    const history = useHistory()
    const {id} = useParams()

    useEffect(() => {
        getProductByID(`/get-product/${id}`).then(r => {
            setProduct({
                product_template: r.data?.product_template?.id,
                product_subcategory: r.data?.product_subcategory.map(v => v.id),
                product_category: r.data?.product_category?.id,
                operating_systems: r.data?.operating_systems.map(v => v.id),
                framework: r.data?.framework?.id,
                title: r.data?.title,
                description: r.data?.description,
                features: r.data?.features
            })
        }).catch(e => setError(handleError(e)))
    },[])

    useEffect(() => console.log(state), [state])

    const next = (v) => {
        updateData(`/product/${id}`, v).then(r => typeof(r.data) == "object" && history.push(`/edit-product/step2/${id}`)).catch(e => setError(handleError(e)))
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return(<>
        <Typography>Edit product# {id}</Typography>
        <Steps current={current}>
            {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
            ))}
        </Steps>
        <div className="steps-content">
            {steps[current].content && steps[current].step == 1 && <AppPorductStep1 next={next} current={current} product={product}/>}
        </div>
    </>)
}