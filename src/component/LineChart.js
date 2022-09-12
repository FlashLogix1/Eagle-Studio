import {Line} from "@ant-design/plots";


export const LineChart = ({data= [], xField, yField}) => {

    const config = {
        data,
        xField: xField,
        yField: yField,
        seriesField: 'category',
        xAxis: xField,
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
    };

    return <Line {...config} />;
}