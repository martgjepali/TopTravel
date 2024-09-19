import { Link } from "react-router-dom";
import { FaUsers, FaCog, FaBalanceScale } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Footer from "../Footer";
import "./About.css";

const About = () => {
  return (
    <div>
      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          <img
            className="mainImg"
            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/eaboutus1.svg"
            alt="About Us"
          />
          <div className="allText aboveText">
            <h2 className="text-blk headingText">About Us</h2>
            <p className="text-blk description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
              pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo
              in ullamcorper quis vestibulum ligula elementum ut.
            </p>
            <div className="icon-text-container">
              <Link className="about-link" to="/how-we-are">
                <div className="icon-text">
                  <FaUsers className="about-icon" />
                  How We Are
                </div>
              </Link>
              <Link className="about-link" to="/how-it-works">
                <div className="icon-text">
                  <FaCog className="about-icon" />
                  How It Works
                </div>
              </Link>
              <Link className="about-link" to="/terms-of-services">
                <div className="icon-text">
                  <FaBalanceScale className="about-icon" />
                  Terms of Service
                </div>
              </Link>
              <Link className="about-link" to="/testimonials">
                <div className="icon-text">
                  <FaMessage className="about-icon" />
                  Testimonials
                </div>
              </Link>
            </div>
            <button className="explore">Explore</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
