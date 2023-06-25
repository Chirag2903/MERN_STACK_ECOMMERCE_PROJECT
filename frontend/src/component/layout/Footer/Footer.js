import React from 'react'
import playstore  from "../../../images/playstore.png";
import appstore  from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftfooter">
            <h4>Download our app</h4>
            <p>Download App for Androids and IOS mobiles</p>
            <img src={playstore} alt='playstore'/>
            <img src={appstore} alt='appstore'/>
        </div>

        <div className="midfooter">
            <h1>cS Ecommerce</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2023 &copy; cS_Chirag </p>
        </div>

        <div className="rightfooter">
            <h4>
                Follow Us
            </h4>
            <a href='http://instagram.com'>Instagram</a>
            <a href='http://youtube.com'>Youtube</a>
            <a href='http://facebook.com'>Facebook</a>

        </div>

    </footer>
  )
}

export default Footer