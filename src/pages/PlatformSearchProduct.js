import {Button, Card, Col, Empty, Input, List, Pagination, Row, Skeleton, Slider, Tooltip, Typography} from "antd";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {AppBreadcrumb} from "../component/AppBreadcrumb";
import {useEffect, useState} from "react";
import {AppList} from "../component/AppList";
import {AppProductCard} from "../component/AppProductCard";
import {getData, getDataByPost} from "../actions/common";
import {handleError} from "../shared/handleError";
import {openNotificationWithIcon} from "../shared/notification";
import {useLocation} from "react-router-dom";
import {useParams} from "react-router";


export const PlatformSearchProduct = () => {

    const {q} = useParams()
    const [breadCrumbName,setBreadCrumbName] = useState()
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(1000)
    const [template, setTemplate] = useState([])
    const [loading, setLoading] = useState(true)
    const [platform, setPlatform] = useState()
    const [products, setProducts] = useState([])
    const [templateType, setTemplateType] = useState()
    const [listLoading, setListLoading] = useState(false)
    const [error, setError] = useState()
    const [list, setList] = useState()
    const [search, setSearch] = useState("")
    const [urn, setUrn] = useState("")
    const location = useLocation()

    useEffect(() => {
        let url = window.location.pathname.replace(/\//g, "").replace('-', ' ')
        setBreadCrumbName(url.toUpperCase())
    },[])

    useEffect(() => {
        if(q) {
            if (template.filter(v => v.type === "category").length > 0)
                setTemplate(template.map(v => v?.type === "category" ? {name: q, type: "category"} : v))
            else
                setTemplate([...new Set(template), {name: q, type: "category"}])
        }
    }, [location])

    useEffect(() => {
        if(error && error != "")
            openNotificationWithIcon("error", error)
    },[error])

    useEffect(() => {
        setLoading(true)
        getData(`product_category`).then(r => setPlatform(r.data)).catch(e => setError(handleError(e)))
        getData(`product_template`).then(r => setTemplateType(r.data)).catch(e => setError(handleError(e)))
    },[])

    const removeData = item => {
        setTemplate(template.filter(v => v.name !== item.name))
    }

    const getFilteredData = (type, object) => {
        if(template.filter(v => v.name === object.name)?.length <= 0) {
            if(type==="price" && template.filter(v => v?.type === "price").length > 0){
                setTemplate(template.map(v => v?.type === "price" ? object: v))
            } else {
                object = {...object, type: type}
                setTemplate([...new Set(template), object])
            }
        }
    }

    useEffect(() => {
        if(template.length > 0) {
            setLoading(true)
            getDataByPost(`getFilterProduct`, {
                template,
                urn
            }).then(r => {
                setLoading(false)
                setProducts(r.data)
            }).catch(err => {
                setLoading(false)
                setError(handleError(err))
            })
        }
        // else
        //     getData(`get-template/product?urn=${window.location.pathname.replace(/\\|\//g,'') }`).then(r => {
        //         setProducts(r.data.data)
        //         setLoading(false)
        //     }).catch(err => setError(handleError(err)))
    },[template])


    const getsubCategories = value => {
        setListLoading(true)
        getDataByPost(`template-product?urn=${value.urn}`).then(r => {
            setSearch("sub-category")
            setProducts(r.data?.data?.product)
            setList(r.data?.data?.productTemplate?.product_subcategories)
            setUrn(value.urn)
            setListLoading(false)
        }).catch(e => {
            setListLoading(false)
            setError(handleError(e))
        })
    }

    const nextPage = page => {
        if(search === "sub-category")
        {
            getDataByPost(`template-product?urn=${urn}&page=${page}`).then(r => {
                setSearch("sub-category")
                setProducts(r.data?.data?.product)
                setList(r.data?.data?.productTemplate?.product_subcategories)
                setListLoading(false)
            }).catch(e => {
                setListLoading(false)
                setError(handleError(e))
            })
        }
        else getData(`get-template/product?urn=${window.location.pathname.replace(/\\|\//g,'')}&page=${page}`).then(r => {
            setProducts(r.data.data)
            setLoading(false)
        }).catch(err => setError(handleError(err)))
    }

    return (
        <Row gutter={[25, 20]} >
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                <AppBreadcrumb name={breadCrumbName} />
                <Typography style={{marginTop: '15px'}}>Currently shopping by: </Typography>
                <List
                    size="small"
                    loading={listLoading}
                    bordered
                    dataSource={[...new Set(template)]}
                    renderItem={item => <List.Item actions={[  <Tooltip placement="right" title="Remove Filter"><CloseOutlined style={{cursor: 'pointer'}} onClick={() => removeData(item)}/></Tooltip>]}>{item.name}</List.Item>}
                    style={{marginTop: '15px'}}
                />

                <Typography style={{marginTop: '15px'}}>Price: </Typography>
                <Card>
                    <Slider range={true} min={0} max={1000} onChange={e => {
                        setMinValue(e[0])
                        setMaxValue(e[1])
                    }} value={[minValue, maxValue]} defaultValue={[minValue, maxValue]}/>
                    <Input type="text" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                    to
                    <Input type="text" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                    <Button style={{marginTop: '10px'}} size="large" icon={<SearchOutlined />} onClick={() =>getFilteredData("price", {type:"price",price: [parseInt(minValue), parseInt(maxValue)], name: "price "+parseInt(minValue)+' - '+parseInt(maxValue)})}  />
                </Card>

                <Typography style={{marginTop: '15px'}}>Select platform: </Typography>
                {platform && <AppList data={platform} type='category' getFilteredData={getFilteredData} />}

                <Typography style={{marginTop: '15px'}}>Template Type: </Typography>
                {templateType && <List
                    size="small"
                    loading={listLoading}
                    bordered
                    dataSource={templateType}
                    renderItem={item => <List.Item style={{cursor: 'pointer'}} onClick={() => getsubCategories(item)}>{item.name}</List.Item>}
                    style={{marginTop: '15px'}}
                />}

                {list && <AppList data={list} getFilteredData={getFilteredData} type='subCategory' />}

            </Col>
            <Col xs={24} sm={12} md={18} lg={18} xl={18}>
                <Row gutter={[15, 5]}>
                    <Skeleton active loading={loading} paragraph={{ rows: 15 }} avatar shape="round">
                        {products && products?.data && products?.data?.map(v => <Col key={v.id}>
                                <AppProductCard product={v} id={v.id} />
                            </Col>
                        )}
                    </Skeleton>
                </Row>
                { (products?.data?.length > 0 ) ? <Pagination defaultCurrent={1} total={products?.total ? products?.total : 0} defaultPageSize={48}
                                                              onChange={nextPage}/> : !loading && <Empty />}
            </Col>
        </Row>
    )
}