import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Row, Col } from 'antd';
import { Bar } from 'react-chartjs-2';

// Main Component
const EarningComponent = () => {
    
    let array1 = [50, 45, 60, 55, 70, 55, 60, 55, 65, 57];
    let array2 = [80, 60, 70, 50, 60, 53, 71, 48, 65, 60];
    let array3 = [45, 55, 51, 65, 50, 62, 58, 70, 48, 57];
    let array4 = [70, 55, 90, 49, 65, 60, 78, 55, 80, 68];
  
    return (
    <Fragment>
        <div className='rowCustomStyle'>
            <div className="fourEqualColumnCustomStyle earning1CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "25px"}}>$2,156</h3>
                <div className='earning6CustomStyle'>Monthly Sales</div>
                <ApexChart array={array1} />
                
            </div>
            <div className="fourEqualColumnCustomStyle earning2CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$15,678</h3>
                <div className='earning6CustomStyle'>Unpaid Commission</div>
                <ApexChart array={array2} />
            </div>
            <div className="fourEqualColumnCustomStyle earning3CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$45,668</h3>
                <div className='earning6CustomStyle'>Revoked Commission</div>
                <ApexChart array={array3} />
            </div>
            <div className="fourEqualColumnCustomStyle earning4CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$32,454</h3>
                <div className='earning6CustomStyle'>Total Earning</div>
                <ApexChart array={array4} />
            </div>
        </div>
        <Row style={{marginTop: "30px"}}>
            <Col lg={8}>
                <Card title="Statistics">
                    <ApexChart array={array1} />
                </Card>
            </Col>
            <Col lg={14} style={{marginLeft: "30px"}}>
                <Card title="Shopping Cart">

                </Card>
            </Col>
        </Row>
    </Fragment>
  )
}

export default EarningComponent;

// Helper Component
class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "",
            data: this.props.array
        }],
        options: {
          chart: {
            toolbar: { // Hamburger menu at top
                show: false,
              },
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
            },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            show: false,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
              axisTicks: {
                show: false
            },
            crosshairs: {
                show: false,
            },
              tooltip: {
                enabled: false,
            }
          },
          yaxis: {
            show: false,
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              show: false,
            },
            tooltip: {
              enabled: false,
            }
          },
          grid: {
            show: false,
            padding: {
                top: -30,
                left: -10
            }
          },
          legend: {
            show: false,
          },
          tooltip: {
            theme: "dark",
            x: {
                show: false
            },
            marker: {
                show: false
            }
          },
          colors: ["#FFFFF7"]
        }
         
      };
    }

  

    render() {
      return (
        <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={200} width={200} />
        </div>
      );
    }
  }
