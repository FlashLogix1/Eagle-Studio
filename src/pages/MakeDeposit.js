import React from 'react'
import { Typography, Card } from 'antd'

const MakeDeposit = () => {
  
    const { Title, Paragraph } = Typography;
  
    return (
    <div>
        <Card>
            <Title level={3}>Make a Deposit</Title>
            <Paragraph>Choose following option to deposit money and avoid PayPal Handling Fee!</Paragraph>
            
        </Card>
    </div>
  )
}

export default MakeDeposit
