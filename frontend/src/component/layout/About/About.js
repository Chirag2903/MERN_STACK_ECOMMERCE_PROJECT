import React from "react";
import "./About.css";
import { Button, Typography,  } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import logo from "../../../images/logo.png"

const About = () => {


  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
          <img id="image"src={logo} alt="cS-Ecommerce"/>
            <Typography>Chirag Shukla</Typography>
            <Button  color="primary">
              ThankYou for Visiting
            </Button>
            <span>
              This is a  wesbite made by @chirag. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2"> Follow Us</Typography>
            <div className="aboutSectionContainer2-2">
            <a
              href="https://www.youtube.com"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://github.com/Chirag2903" target="blank">
              < GitHubIcon className="GitHubsvgIcon" />
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
