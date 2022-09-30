import React, { Fragment, useState, Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Row, Col, Typography, Table, Checkbox, Progress } from 'antd';
import { Bar } from 'react-chartjs-2';
import '../../src/CustomStyles.css';
import {RiDeleteBin5Line, FaArrowUp, FiActivity, FiPercent, FiTrendingUp, FiCreditCard} from 'react-icons/all';
import { Line } from 'react-chartjs-2';
import {Chart as chartJS} from 'chart.js/auto';

// Main Component
const EarningComponent = () => {
    
    let array1 = [50, 45, 60, 55, 70, 55, 60, 55, 65, 57];
    let array2 = [80, 60, 70, 50, 60, 53, 71, 48, 65, 60];
    let array3 = [45, 55, 51, 65, 50, 62, 58, 70, 48, 57];
    let array4 = [70, 55, 90, 49, 65, 60, 78, 55, 80, 68];
    const { Title } = Typography;

    const UserData = [
      {
        id: 1,
        month: "Jan",
        sales: 80,
        visits: 5,
      },
      {
        id: 2,
        month: "Feb",
        sales: 95,
        visits: 45,
      },
      {
        id: 3,
        month: "Mar",
        sales: 87,
        visits: 40,
      },
      {
        id: 4,
        month: "Apr",
        sales: 155,
        visits: 55,
      },
      {
        id: 5,
        month: "May",
        sales: 140,
        visits: 49,
      },
      {
        id: 6,
        month: "Jun",
        sales: 147,
        visits: 65,
      },
      {
        id: 7,
        month: "Jul",
        sales: 130,
        visits: 60,
      },
      {
        id: 8,
        month: "Aug",
        sales: 180,
        visits: 105,
      },
      {
        id: 9,
        month: "Sep",
        sales: 160,
        visits: 75,
      },
      {
        id: 10,
        month: "Oct",
        sales: 175,
        visits: 115,
      },
      {
        id: 11,
        month: "Nov",
        sales: 165,
        visits: 125,
      },
      {
        id: 12,
        month: "Dec",
        sales: 200,
        visits: 150,
      }
    ];


    const [userData, setUserData] = useState(
      {
        labels: UserData.map((data)=>data.month),
        datasets:
        [
          {
            label: 'SALES',
            data:  UserData.map((data)=>data.sales),
            backgroundColor: [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
            ],
            borderColor: "#40c057",
            borderWidth: 2,
          },
          {
            label: 'VISITS',
            data:  UserData.map((data)=>data.visits),
            backgroundColor: [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
            ],
            borderColor: "#2f8be6",
            borderWidth: 2,
          }
        ]
      }
    );

    const UserData2 = [
      {
        id: 1,
        day: "Mon",
        statistics: 80
      },
      {
        id: 2,
        day: "Tue",
        statistics: 85
      },
      {
        id: 3,
        day: "Wed",
        statistics: 75
      },
      {
        id: 4,
        day: "Thu",
        statistics: 65
      },
      {
        id: 5,
        day: "Fri",
        statistics: 63
      },
      {
        id: 6,
        day: "Sat",
        statistics: 70
      },
      {
        id: 7,
        day: "Sun",
        statistics: 82
      }
    ];

    const [userData2, setUserData2] = useState(
      {
        labels: UserData2.map((data)=>data.day),
        datasets:
        [
          {
            label: 'STATISTICS',
            data:  UserData.map((data)=>data.sales),
            backgroundColor: [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
            ],
            borderColor: "#ffffff",
            borderWidth: 2
          }
        ]
      }
    );

    const options2 = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false   
          },
          ticks: {
            color: 'white',
          },
          beginAtZero: true
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          },
          beginAtZero: true
        }
      },
      labels: {
        colors: ["#ffffff"]
      }
    };

    // const nameOfImages = ["11A.png", "12A.png", "13A.png", "14A.png"];

    // react antd table columns
    const columns = [
      {
        title: 'Image',
        width: 20,
        dataIndex: 'image',
        key: 'image',
        // render: () =>  <img src="11A.png"  alt='issue With The Image' width="50px" height="50px"/> 
      },
      {
        title: 'Product',
        width: 20,
        dataIndex: 'product',
        key: 'product'
      },
      {
        title: 'Quantity',
        width: 20,
        dataIndex: 'quantity',
        key: 'quantity'
      },
      {
        title: 'Status',
        width: 20,
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: 'Amount',
        width: 20,
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: 'Delete',
        key: 'operation',
        width: 20,
        render: () => <RiDeleteBin5Line style={{cursor: "pointer"}} />
      },
    ];

    // react antd table data
    const data = [
      {
        key: '1',
        image: <img src='/11A.png'  alt='image1' width="50px" height="50px" />,
        product: 'Espresso',
        quantity: 1,
        status: <div style={{backgroundColor: "#efdeff", color: "#975aff", borderColor: "#efdeff", cursor: "pointer", borderRadius: "10rem", width: "65px", padding: "5px 1px 5px 8px"}}>Active</div>,
        amount: "$" + 19.94
      },
      {
        key: '2',
        image: <img src='/12A.png'  alt='image1' width="50px" height="50px" />,
        product: 'iPhone',
        quantity: 2,
        status: <div style={{backgroundColor: "#fee8dc", color: "#f55252", borderColor: "#fee8dc", cursor: "pointer", borderRadius: "10rem", width: "83px", padding: "5px 1px 5px 8px"}}>Disabled</div>,
        amount: "$" + 99.00
      },
      {
        key: '3',
        image: <img src='/13A.png'  alt='image1' width="50px" height="50px" />,
        product: 'iMac',
        quantity: 1,
        status: <div style={{backgroundColor: "#d5f1fd", color: "#2f8be6", borderColor: "#d5f1fd", cursor: "pointer", borderRadius: "10rem", width: "74px", padding: "5px 1px 5px 8px"}}>Paused</div>,
        amount: "$" + 299.00
      },
      {
        key: '4',
        image: <img src='/14A.png'  alt='image1' width="50px" height="50px" />,
        product: 'iWatch',
        quantity: 2,
        status: <div style={{backgroundColor: "#e0fbda", color: "#40c057", borderColor: "#e0fbda", cursor: "pointer", borderRadius: "10rem", width: "65px", padding: "5px 1px 5px 8px"}}>Active</div>,
        amount: "$" + 24.51
      }
    ];

    
    // main component web ui
    return (
    <Fragment>
        <Row style={{marginTop: "20px", padding: "0px 150px"}}>
          <Col xs={24} sm={24} md={24} lg={5} style={{backgroundImage: "linear-gradient(45deg,#7441db,#c89cff)", padding: "10px 0px 10px 20px", borderRadius: "10px", marginRight: "58px"}}>
            <Row>
              <Col lg={12}>
                <h3 className='earning5CustomStyle' style={{fontSize: "25px"}}>$2,156</h3>
                <div className='earning6CustomStyle'>Monthly Sales</div>
              </Col>
              <Col lg={12}>
                <FiActivity style={{color: "white", fontSize: "35px", marginLeft: "45px"}}/>
              </Col>
            </Row>
            <LineChart array={array1} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={5} style={{backgroundImage: "linear-gradient(45deg,#b02940,#fcc173)", padding: "10px 0px 10px 20px", borderRadius: "10px", marginRight: "58px"}}>
            <Row>
              <Col lg={12}>
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$15,678</h3>
                <div className='earning6CustomStyle'>Unpaid Commission</div>
              </Col>
              <Col lg={12}>
                <FiPercent style={{color: "white", fontSize: "35px", marginLeft: "45px"}}/>
              </Col>
            </Row>
            <LineChart array={array2} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={5} style={{backgroundImage: "linear-gradient(45deg,#226cc5,#6cd975)", padding: "10px 0px 10px 20px", borderRadius: "10px", marginRight: "58px"}}>
            <Row>
              <Col lg={12}>
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$45,668</h3>
                <div className='earning6CustomStyle'>Revoked Commission</div>
              </Col>
              <Col lg={12}>
                <FiTrendingUp style={{color: "white", fontSize: "35px", marginLeft: "45px"}} />    
              </Col>
            </Row>
            <LineChart array={array3} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={5} style={{backgroundImage: "linear-gradient(45deg,#7441db,#f9877c)", padding: "10px 0px 10px 20px", borderRadius: "10px"}}>
            <Row>
              <Col lg={12}>
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$32,454</h3>
                <div className='earning6CustomStyle'>Total Earning</div>
              </Col>
              <Col lg={12}>
                <FiCreditCard style={{color: "white", fontSize: "35px", marginLeft: "45px"}} />
              </Col>
            </Row>
            <LineChart array={array4} />
          </Col>
        </Row>
            
            
        {/* <div className='rowCustomStyle'>
            <div className="fourEqualColumnCustomStyle earning1CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "25px"}}>$2,156</h3>
                <div className='earning6CustomStyle'>Monthly Sales</div>
                <LineChart array={array1} />    
            </div>
            <div className="fourEqualColumnCustomStyle earning2CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$15,678</h3>
                <div className='earning6CustomStyle'>Unpaid Commission</div>
                <LineChart array={array2} />
            </div>
            <div className="fourEqualColumnCustomStyle earning3CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$45,668</h3>
                <div className='earning6CustomStyle'>Revoked Commission</div>
                <LineChart array={array3} />
            </div>
            <div className="fourEqualColumnCustomStyle earning4CustomStyle">
                <h3 className='earning5CustomStyle' style={{fontSize: "24px"}}>$32,454</h3>
                <div className='earning6CustomStyle'>Total Earning</div>
                <LineChart array={array4} />
            </div>
        </div> */}
        <Row style={{marginTop: "30px", padding: "0px 150px"}}>
          <Col lg={24}>
          {/* <Title level={4}>PRODUCTS SALES</Title> */}
            <Card title="PRODUCTS SALES">
              <SplineAreaChart />
            </Card>
          </Col>
        </Row>
        {/* Thrid Row */}
        <Row style={{marginTop: "30px", padding: "0px 150px"}}>
            <Col lg={8}>
                <Card title="Statistics">
                  <h4 style={{textAlign: "center"}}>Last 6 Months Sales</h4>
                  <DistributedColumnsChart />
                </Card>
            </Col>
            <Col lg={15} style={{marginLeft: "43px"}}>
                <Card title="Shopping Cart" style={{height: "509px"}}>
                <Table
                  columns={columns}
                  dataSource={data}
                  scroll={{
                    x: 1300,
                  }}
                  pagination={false}
                />
                </Card>
            </Col>
        </Row>
        {/* Fourth Row */}
        <Row style={{marginTop: "30px", padding: "0px 150px"}}>
          <Col lg={16}>
            <Card title="Visit & Sales Statistics">
              <Line data={userData}/>
            </Card>
          </Col>
          <Col lg={7} style={{backgroundImage: "linear-gradient(45deg,#562db7,#60aff0)", marginLeft: "43px"}}>
            <h4 className='earning7CustomStyle'>Statistics</h4>
            <div className='earning8CustomStyle'>
              <span className='earning9CustomStyle'>Month</span> 
              <span className='earning10CustomStyle'>Week</span> 
              <span className='earning11CustomStyle'>Day</span>
            </div>
            <div className='earning12CustomStyle'>
              <div className='earning13CustomStyle'>
                  <span>$78.89</span> <FaArrowUp className='earning14CustomStyle' />
              </div>
              <span className='earning15CustomStyle'>Week2 +15.44</span>
            </div>
            <div>
              <Line data={userData2} options={options2} />
            </div>
          </Col>
        </Row>
        {/* Fifth Row */}
        <Row style={{marginTop: "30px", padding: "0px 150px", marginBottom: "60px"}}>
          <Col lg={7}>
              <Card title="Statistics">
                  <p className='earning16CustomStyle'>Hobbies</p>
                  <DistributedColumnsChart2 />
              </Card>
          </Col>
          <Col lg={7} style={{margin: "0px 65px"}}>
              <Card title="User List">
                <UserListComponent imageName="jessica" userName="Jessica Rice" designation="UX Designer" isDefaultChecked={true} />
                <UserListComponent imageName="jacob" userName="Jacob Rios" designation="HTML Developer" isDefaultChecked={false} />  
                <UserListComponent imageName="russell" userName="Russell Delgado" designation="Database Designer"  isDefaultChecked={false} />
                <UserListComponent imageName="sara" userName="Sara McDonald" designation="Team Leader" isDefaultChecked={true} />
                <UserListComponent imageName="janet" userName="Janet Lucas" designation="Project Manger" isDefaultChecked={false} />
                <UserListComponent imageName="mark" userName="Mark Carter" designation="HTML Developer" isDefaultChecked={true} />
                <div className='earning18CustomStyle'>
                  <button type='button' className='earning19CustomStyle'>Add New</button>
                </div>
                  
              </Card>
          </Col>
          <Col lg={7}>
              <Card title="Project Stats">
                <p className='earning16CustomStyle'>Project Tasks</p>
                <DonutChartComponent />
                  <div
                    style={{
                      width: 170,
                      marginTop: "30px"
                    }}
                  >
                    <Progress percent={23} size="small" strokeColor="#2f8be6" format={(percent) => `${percent}% - Started`} />
                    <Progress percent={28} size="small" strokeColor="#40c057" format={(percent) => `${percent}% - Done`}  />
                    <Progress percent={35} size="small" strokeColor="#975aff" format={(percent) => `${percent}% - Remaining`}  />
                    <Progress percent={14} size="small" strokeColor="#f77e17" format={(percent) => `${percent}% - In Progress`}  />
                  </div>
              </Card> 
          </Col>
        </Row>
    </Fragment>
  )
}

export default EarningComponent;



const UserListComponent = (props) => {
  return (
    <Fragment>
      <div style={{display: "flex"}}>
        <div style={{marginRight: "20px"}}><img src={`/${props.imageName}.png`} alt={`${props.imageName}`} width="35px" style={{borderRadius: "50%"}} /></div>
        <div><h4 style={{fontSize: "1.1rem", width: "200px"}}>{props.userName}</h4><p className='earning17CustomStyle'>{props.designation}</p></div>
        <div><Checkbox defaultChecked={props.isDefaultChecked} onChange={(eventParam1) => console.log(`checked = ${eventParam1.target.checked}`)} /></div>
      </div>
    </Fragment>
  )
}







// Helper Component # 1
class LineChart extends React.Component 
{
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


// Helper Component # 2
class SplineAreaChart extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: '',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: '',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      options: {
        chart: {
          toolbar: { // Hamburger menu at top
            show: false,
          },
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          // type: 'datetime',
          categories: ["1", "2", "3", "4", "5", "6", "7"],
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
        legend: {
          show: false,
        },
        tooltip: {
          marker: {
            show: false
          },
          theme: "dark",
          colors: ["#FFFFF7"],
          y: {
            title: {
              show: false
            }
          }
        },
        
      },
    
    
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
</div>


    );
  }
}

// Helper Component # 3
class DistributedColumnsChart extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }],
      options: {
        chart: {
          toolbar: { // Hamburger menu at top
            show: false,
          },
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: ["#975aff"],
        plotOptions: {
          bar: {
            columnWidth: '15%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['Jan'],
            ['Feb'],
            ['Mar'],
            ['Apr'],
            ['May'],
            ['Jun'],
            ['Jul'],
            ['Aug']
          ],
          labels: {
            style: {
              colors: ["#000000"],
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          show: false
        },
        tooltip: {
          enabled: false,
        },
        grid: {
          show: false
        }
      },
    
    
    };
  }



  render() {
    return (
      

    <div id="chart">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
    </div>


    );
  }
}

// Helper Component # 4
class DistributedColumnsChart2 extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: [48, 9, 26, 17]
      }],
      options: {
        chart: {
          toolbar: { // Hamburger menu at top
            show: false,
          },
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: ["#d23b48","#2f8be6", "#226cc5", "#6cd975", "#562db7", "#60aff0", "#b02940", "#fcc173"],
        plotOptions: {
          bar: {
            columnWidth: '25%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          markers: {
            radius: 12
          },
          itemMargin: {
            // horizontal: 50,
            vertical: 50
          }
        },
        xaxis: {
          categories: [
            ['Sport'],
            ['Music'],
            ['Travel'],
            ['News']
          ],
          labels: {
            style: {
              colors: ["#000000"],
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          show: false
        },
        tooltip: {
          enabled: false,
        },
        grid: {
          show: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#d23b48","#2f8be6", "#226cc5", "#6cd975", "#562db7", "#60aff0", "#b02940", "#fcc173"], // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
          }
        }
      }
    
    
    };
  }



  render() {
    return (
      

    <div id="chart">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
    </div>


    );
  }
}


// Helper Component # 5
class DonutChartComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['A', 'B', 'C', 'D'],
        legend: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        dataLabels: {
          enabled: false
        },
        fill: { colors: ['#2f8be6', '#40c057', '#975aff', '#f77e17'] },
        // colors: ['red', 'green', 'yellow', 'blue']
      },
      series: [23, 28, 35, 14]

    }
  }

  render() {

    return (
      <div className="donut">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="300" />
      </div>
    );
  }
}

