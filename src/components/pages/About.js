import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaCog, FaBalanceScale } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Footer from "../Footer";
import Image from "../../assets/about-img.jpg";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/packages");
  };

  return (
    <div>
      <div className="bigContainer">
        <img className="mainImg" src={Image} alt="About Us" />
        <div className="Container">
          <h2 className="text-blk">About Us</h2>
          <p className="text-blk description">
            The idea behind Top Travel came up in early 2019, between two
            friends brought up in North Glasgow but with origin roots in
            Albania. We had a passion for travel and wanted to showcase the
            beauty and uniqueness of our home country to Scotland and beyond.
            With the impact of COVID 19 restrictions, our plans were on hold
            until 2023 when Ryanair introduced direct flights from Edinburgh to
            Tirana. This rejuvenated our desire to offer Albania as a new and
            exciting travel destination and so we set out to pick a handful of
            customers to trial a 7 day holiday itinerary using our connection
            and relationships with hotel and other partners. The trial and
            feedback was a great success leading us to establishing our website
            and offering our fantastic trips to Scotland and the UK.
          </p>
          <div className="icon-text-container">
            <Link className="about-link" to="/who-we-are">
              <div className="icon-text">
                <FaUsers className="about-icon" />
                Who We Are
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
          <button className="explore" onClick={handleExploreClick}>Explore</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
