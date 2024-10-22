import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Image from "../../assets/image-hike.jpeg";
import "./WhoWeAre.css";

const HowWeAre = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/packages");
  };

  return (
    <>
      <div>
        <div className="bigContainer">
          <img className="mainImg" src={Image} alt="About Us" />
          <div className="Container">
            <h2 className="text-blk">Who We Are</h2>
            <p className="text-blk description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
              pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo
              in ullamcorper quis vestibulum ligula elementum ut.
            </p>
            <button className="explore" onClick={handleExploreClick}>
              Explore
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HowWeAre;
