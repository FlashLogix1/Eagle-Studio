import {List} from "antd";

export const AppList = (props) => {

    return(<List
        size="small"
        bordered
        dataSource={props.data}
        renderItem={item => <List.Item style={{cursor: 'pointer'}} onClick={() => props.getFilteredData(props.type, item)}>{item.name}</List.Item>}
        style={{marginTop: '15px'}}
    />)

}