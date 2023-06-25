import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import GmaiIcon from "@material-ui/icons/Mail";
import InstagramIcon from "@material-ui/icons/Instagram";


const Contact = () => {
  return (
  <div className="contact-page">
      <div className="contactContainer">
      <h1>Contact Info</h1>
       <a className="mailBtn" href="mailto:cs_29@gmail.com">
        <Button>cs_29@gmail.com</Button>
       </a>
      </div>
     
      <div className="contact-containter-2">
           <h2> Follow Us</h2>
        <div className="conatct-container2-2">
            <a
              href="https://www.instagram.com"
              target="blank"
            >
              <InstagramIcon className="instaSvgIcon" />
            </a>

            <a href="https://www.gmail.com" target="blank">
              < GmaiIcon className="mailsvgIcon" />
            </a>
        </div>
      </div>  
  </div>
        
  );
};

export default Contact;
