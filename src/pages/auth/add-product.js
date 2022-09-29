import {Button, Steps, Typography, message, Card} from "antd";
import {useState, useEffect} from "react";
import {AppPorductStep1} from "../../component/AppPorductStep1";
import {AppProductStep2} from "../../component/AppProductStep2";
import {AppProductStep3} from "../../component/AppProductStep3";
import {saveData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {useHistory, useParams} from "react-router";
import {AppBreadcrumb} from "../../component/AppBreadcrumb";
import '../../../src/CustomStyles.css';

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

export const AddProduct = () => {

    const [breadCrumbName,setBreadCrumbName] = useState('')
    const [current, setCurrent] = useState(0);
    const history = useHistory();
    const {id} = useParams();


    const next = (v) => {
        console.log(v)
        saveData(`/product`,v).then(r => typeof (r.data) == "object" && history.push(`/edit-product/step2/${r.data.id}`)).catch(e => console.log(handleError(e)))
        
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    return(<>
        <div className="barCustomStyle" style={{marginBottom: "25px"}}>
            <AppBreadcrumb name={breadCrumbName} />
        </div>
        {/* <Typography>Create new product</Typography> */}
        <div className="site-card-border-less-wrapper" style={{width: "900px", margin: "auto"}}>
                <Card title="Create new product" bordered={true}>
                        <Steps current={current}>
                {steps.map(item => (
                    <Steps.Step key={item.title} title={item.title} />
                ))}
                </Steps>
                <div className="steps-content">
                    <AppPorductStep1 next={next} current={current} productId={id}/>
                </div>
                <div className="steps-action">
                </div>
                </Card>
        </div>
        
    </>)
}