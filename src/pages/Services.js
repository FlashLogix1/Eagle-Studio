import React, { Fragment } from 'react';
import '../../src/CustomStyles.css';
import { BulbOutlined, RocketOutlined } from '@ant-design/icons'
import { FaGamepad } from 'react-icons/all';

const ServicesComponent = () => {
  return (
    <Fragment>
        <section className='servicesHeadCustomStyle'>
            <div className='servicesHeadingCustomStyle'>
                <h1 style={{color: "white"}}>Services - BuyMySourceCode</h1>
            </div>
        </section>
        <section className='rowCustomStyle' style={{marginTop: "30px"}}>
            <h2 style={{fontWeight: "700", marginLeft: "8px"}}>BuyMySourceCode Services</h2>
            <div className='twoColumnCustomStyle'>
                <p>BuyMySourceCode is one of best platform for mobile games and application developing. We make different – different types of games and application. Our all games unique and own idea which help to earning. We also offering ready made code and provide different types of services. And also we make unique games as per your requirement and your idea.</p>
                <p>Everyone wan’t earning games but not know how to earn. We completed provide guidlines and help to earn good revenue. BuyMySourceCode is largest marketplace in this you can buy our source codes for different types of playfrom like Android, IOS and Unity. Our games queality is high and easy to reskin. If you don’t know how reskin so we also completed provide service to completed development to launch your games and application.</p>
                <p>BuyMySourceCode in very low price source code so you easy to start your earning with us. Our code is net and Clean and We provide 24/7 Support. BuyMySourceCode which help to increasing trend and if you promote your game with Digital Marketing so you get double profit.</p>
                <p>BuyMySourceCode is large platform for everyone who wan’t to earn from games and app business..</p>
            </div>
            <div className='twoColumnCustomStyle'>
                <img src='/z2.png' width="1488" height="1215" alt='z2.png' style={{width: "100%", height: "auto", display: "block"}} />
            </div>
        </section>
        <section>
            <div style={{textAlign: "center"}}>
                <h2 style={{fontWeight: "700"}}>BuyMySourCode Premium Services</h2>
                <p style={{paddingInline: "115px"}}>Trusted by 300+ companies in worldwide! Our highly professional team trained to the highest standards to deliver a quality focussed service to our clients. Your favorite brands are also trusted on us!</p>
            </div>
            <div className='rowCustomStyle'>
                <div className='threeColumnCustomStyle' style={{backgroundColor: "rgb(255 230 160)", paddingTop: "50px", paddingLeft: "30px", paddingRight: "36px"}}>
                    <BulbOutlined className='iconCustomStyle' />
                    <h5 style={{color: "#6023D8"}}>New Idea App Services</h5>
                    <p>We have unmatched experience in developing professional, innovative and highly income generated Apps and Games.</p>
                </div>
                <div className='threeColumnCustomStyle' style={{backgroundColor: "rgb(255 211 238)"}}>
                    <FaGamepad className='iconCustomStyle' style={{backgroundColor: "#00AEEF"}} />
                    <h5 style={{color: "#6023D8"}}>Reskin & Games Services</h5>
                    <p>We will reskin your favorite App and Game with Latest, trending and stylish layout at the lowest cost and Delivered Fast.</p>
                </div>
                <div className='threeColumnCustomStyle' style={{backgroundColor: "rgb(230 253 193)"}}>
                    <RocketOutlined className='iconCustomStyle' style={{backgroundColor: "#24EEFC"}} />
                    <h5 style={{color: "#6023D8"}}>App Launching Services</h5>
                    <p>Lunch your next app or game with no time, don’t wait for designers and developers. Just choose your favorite one and get it right now!</p>
                </div>
            </div>
        </section>
    </Fragment>
  )
}

export default ServicesComponent;
