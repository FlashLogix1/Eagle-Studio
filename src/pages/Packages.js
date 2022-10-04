import React, { Fragment } from 'react';

const PackagesComponent = () => {
  return (
    <Fragment>
        <div style={{padding: "0px 150px"}}>
            <section className='packages1CustomStyle'>
                <div className='packages2CustomStyle'>
                    <h1 className='packages3CustomStyle'>PLEASE SELECT A PLAN</h1>
                    <p className='packages4CustomStyle'>We will contact you via your email after you finish your order.</p>
                </div>
            </section>
            {/* .............................................................................................................. */}
            <section style={{paddingTop: "15px"}}>
                <div className='rowCustomStyle'>
                    <div className='twoUnEqualColumn1234CustomStyle left1234CustomStyle'>
                        <h2 className='packages8CustomStyle'>BASIC</h2>
                        <ul>
                            <li><strong>We change out all the graphics with your source code.</strong></li>
                            <li><strong>We use basic Ad Frameworks of the original source code.</strong></li>
                            <li><strong>We make the screenshots, icons for your apps.</strong></li>
                            <li><strong>We publish the app to Google Play and Appstore for you.</strong></li>
                            <li><strong>Minimum budget: 700$.</strong></li>
                        </ul>
                    </div>
                    <div className='twoUnEqualColumn1234CustomStyle right1234CustomStyle'>
                        <img src='/8A.jpg' alt='8A.jpg' className='packages5CustomStyle' />
                    </div>
                </div>
                <div className='packages6CustomStyle'>
                    <div style={{textAlign: "center"}}>
                        <a className='packages7CustomStyle'>ORDER BASIC NOW</a>
                    </div>
                </div>
            </section>
            {/* .............................................................................................................. */}
            <section style={{backgroundColor: "#a6ddbe", paddingTop: "15px"}}>
                <div className='rowCustomStyle'>
                    <div className='twoUnEqualColumn1234CustomStyle left1234CustomStyle' style={{height: "450px"}}>
                        <h2 style={{color: "#008000"}} className='packages8CustomStyle'>PRO</h2>
                        <ul>
                            <li><strong>We change out all the graphics with your code.</strong></li>
                            <li><strong>We tweak Ad Frameworks for better monetization.</strong></li>
                            <li><strong>We modify the existing code  according to your idea.</strong></li>
                            <li><strong>We add the logo splashscreen of your company.</strong></li>
                            <li><strong>We make the screenshots, icons for your apps.</strong></li>
                            <li><strong>We integrate Google analytics to your app.</strong></li>
                            <li><strong>We publish the app to Google Play and Appstore for you.</strong></li>
                            <li><strong>Minimum budget: 1000$.</strong></li>
                        </ul>
                    </div>
                    <div className='twoUnEqualColumn1234CustomStyle right1234CustomStyle'>
                        <img src='/1C.jpg' alt='1C.jpg' className='packages5CustomStyle' />
                    </div>
                </div>
                <div className='packages6CustomStyle' style={{backgroundColor: "#7fcba1"}}>
                    <div style={{textAlign: "center"}}>
                        <a className='packages7CustomStyle' style={{backgroundColor: "rgb(15, 140, 70)", border: "2px solid white"}}>ORDER PRO NOW</a>
                    </div>
                </div>
            </section>
            {/* .............................................................................................................. */}
            <section style={{backgroundColor: "#f7d3c5", paddingTop: "15px"}}>
                <div className='rowCustomStyle'>
                    <div className='twoUnEqualColumn1234CustomStyle left1234CustomStyle' style={{height: "450px"}}>
                        <h2 style={{color: "#ff6600"}} className='packages8CustomStyle'>HARDCORE</h2>
                        <ul>
                            <li><strong>We make a new game from your idea (art and code).</strong></li>
                            <li><strong>We integrate any Ad Networks that you want for monetizing.</strong></li>
                            <li><strong>We add the logo splashscreen of your company.</strong></li>
                            <li><strong>We make the screenshots, icons for your apps.</strong></li>
                            <li><strong>We integrate Google analytics to your app.</strong></li>
                            <li><strong>We integrate Google analytics to your app.</strong></li>
                            <li><strong>We publish the app to Google Play and Appstore for you.</strong></li>
                            <li><strong>Minimum budget: 1500$.</strong></li>
                        </ul>
                    </div>
                    <div className='twoUnEqualColumn1234CustomStyle right1234CustomStyle'>
                        <img src='/2C.jpg' alt='2C.jpg' className='packages5CustomStyle' />
                    </div>
                </div>
                <div className='packages6CustomStyle' style={{backgroundColor: "#f9a17c"}}>
                    <div style={{textAlign: "center"}}>
                        <a className='packages7CustomStyle' style={{backgroundColor: "rgb(254, 88, 3)", border: "2px solid white"}}>ORDER HARDCORE NOW</a>
                    </div>
                </div>
            </section>
            <section className='packages9CustomStyle'>
                <div className='packages10CustomStyle'>
                    <p>
                        <span>High-quality source codes can be bought from many providers over the internet. For more information about source code sellers.</span>
                        <strong><a href="https://www.topappreskin.com/top-10-marketplaces-appreskinning/">you can click here.</a></strong>
                    </p>
                </div>
            </section>
        </div>
        

    </Fragment>
  )
}

export default PackagesComponent;
