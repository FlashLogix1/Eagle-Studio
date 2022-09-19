// Sumair editing in src => pages => MakeDeposit.js
import React, { useState } from 'react';
import { Typography, Card, Radio, Space } from 'antd';
import '../../src/CustomStyles.css';

const MakeDeposit = () => {
  
    const { Title, Paragraph } = Typography;
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(1);
    
    const onChangeForFirstRadioGroup = (e) => {
        console.log('radio checked', e.target.value);
        setValue1(e.target.value);
    };

    const onChangeForSecondRadioGroup = (e) => {
        console.log('radio checked', e.target.value);
        setValue2(e.target.value);
      };

    

    return (
    <div>
        <Card>
            <Title level={3}>Make a Deposit</Title>
            <Paragraph>Choose following option to deposit money and avoid PayPal Handling Fee!</Paragraph>

            <Radio.Group onChange={onChangeForFirstRadioGroup} value={value1}>
                <Radio value={1}>$250</Radio>
                <Radio value={2}>$750</Radio>
                <Radio value={3}>$1500</Radio>
                <Radio value={4}>$500</Radio>
            </Radio.Group>

            <Paragraph style={{marginTop: "25px"}}>Or Choose Our Promo Package!</Paragraph>

            <Radio.Group onChange={onChangeForSecondRadioGroup} value={value2}>
                <Space direction="vertical">
                    <Radio value={1}>Pay $2450 to get deposit money of $2500 (Discount 2.00%)</Radio>
                    <Radio value={2}>Pay $4800 to get deposit money of $5000 (Discount 4.00%)</Radio>
                    <Radio value={3}>Pay $9000 to get deposit money of $10000 (Discount 10.00%)</Radio>
                </Space>
            </Radio.Group>

            <Paragraph style={{marginTop: "25px"}}>By depositing money, you could avoid paying for PayPal Handling fee of $4.00</Paragraph>
            <button className='buttonCustomStyle' style={{backgroundColor: "black", color: "white", marginTop: "20px"}}>Buy Credits</button>
        </Card>
    </div>
  )
}

export default MakeDeposit
