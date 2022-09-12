import {Button, Col, Image, Row, Space, Table, Tooltip, Typography} from "antd";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Text from "antd/es/typography/Text";
import {deleteData} from "../../actions/common";
import {handleError} from "../../shared/handleError";
import {DeleteTwoTone} from "@ant-design/icons";
import React from "react";
import {PayPalButtons} from "@paypal/react-paypal-js";
import {openNotificationWithIcon} from "../../shared/notification";
import {useHistory} from "react-router";
import {APIContext} from "../../context/context";
import apiClient from "../../shared/apiClient";

export const Checkout = () => {

    const [cartState, setCartState] = useContext(APIContext)
    const [amount, setAmount] = useState(0)
    const [paypal, setPayal] = useState({})
    const history = useHistory()

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'Product',
            render: (text, record) => {
                return (
                    <Space>
                        <Image src={record?.thumbnail_image?.url} width={80} height={65} preview={false} />
                        <Text>{record?.title}</Text>
                    </Space>
                )
            }
        },
        {
            title: 'LICENSE',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => record.pivot.type
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            key: 'price',
            render: (text, item) => (<Text style={{color: 'green'}}>${item.pivot.type === "single_app_license" ? item.single_app_license : item.multi_app_license}</Text>)
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, item) => {
                return (<>
                    <Tooltip title="Delete"><DeleteTwoTone twoToneColor="red" style={{cursor: 'pointer'}} onClick={()=> deleteCartData(cartState[0].id, item.id, item.pivot.type === "single_app_license" ? item.single_app_license : item.multi_app_license)} /></Tooltip>
                </>)
            }
        }
    ]

    const deleteCartData = (id, productID,price) => {
        deleteData(`cart/${id}?product_id=${productID}&price=${price}`).then(r => {
            if(r.data.status) {
                setCartState(r.data.data)
                openNotificationWithIcon("success", r.data?.message)
            } else {
                openNotificationWithIcon("error", r.data?.message)
            }
        }).catch(e => {
            if(!handleError(e)?.status) {
                openNotificationWithIcon("error", handleError(e).errMess)
            }
        })
    }

    useEffect(() => {
        if(cartState && cartState.length > 0 ){
            setAmount(cartState.map( v => v.price).reduce((prv, next) => (parseInt(prv)+parseInt(next))))
        }
    },[cartState])

    const payment = paypalData => {
        apiClient.post("paypal", {paypalData, cart: cartState && cartState.length > 0 && cartState[0], product_ids: cartState.length > 0 && cartState[0]?.product.map(v => {
                return ({id: v.id, type: v.pivot.type })
            })}).then(r => {
            if(r.data?.status) {
               openNotificationWithIcon("success", r.data.message)
               setCartState(r.data.data)
               history.push("/purchases")
           } else openNotificationWithIcon("error", r.data.message)
        }).catch(e => {
            console.log(handleError(e))
            if(!handleError(e).status)
                openNotificationWithIcon("error", handleError(e).errMess)
        })
    }

    return(<div>
        <Typography underline>Checkout</Typography>
        {cartState && cartState.length > 0 ? <>
            <Text style={{float: 'right'}}><Link to="/">Continue Shopping</Link></Text>
            <Table columns={columns} dataSource={cartState && cartState.length > 0 && cartState[0]?.product} />
            <Text>Lifetime updates, Full support, 14 Days money back guarantee</Text>
            <Text style={{float: 'right'}}>Summary: <Text style={{color: 'green'}}>${cartState && cartState?.length >0 && cartState[0].price}</Text></Text>

            <Row>
                <Col span={8}>
                    {/*<Button onClick={() => payment(paypal)}> Tesing</Button>*/}
                    <PayPalButtons style={{ layout: "horizontal" }}
                                   forceReRender={[amount]}
                                   createOrder={(data, actions) => {
                                       return actions.order
                                           .create({
                                               purchase_units: [
                                                   {
                                                       amount: {
                                                           value: amount,
                                                       },
                                                   },
                                               ],
                                           })
                                           .then((orderId) => {
                                               // Your code here after create the order
                                               return orderId;
                                           });
                                   }}
                                   onApprove={function (data, actions) {
                                       return actions.order.capture().then(function (r) {
                                           // Your code here after capture the order
                                           let paypalData = {paypal_id: r.id, intent: r.intent, country_code: r.payer.address.country_code, payer_id: r.payer.payer_id, payer_email: r.payer.email_address,
                                               payer_name: r.payer.name.given_name, payer_surname: r.payer.name.surname, currency_code: r.purchase_units[0].amount.currency_code,
                                               amount: r.purchase_units[0].amount.value, payee_email: r.purchase_units[0].payee.email_address, payee_merchant_id: r.purchase_units[0].payee.merchant_id,
                                               status: r.status}
                                            setPayal(paypalData)
                                            payment(paypalData)
                                       });
                                   }}

                    />

                </Col>
            </Row>
        </> : <Text>Shopping cart is empty. <Link to="/">Go to the shopping</Link></Text>}
    </div>)
}
