import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Image from "../../assets/image-hike.jpeg";
import "./HowWeAre.css";

const HowWeAre = () => {
  const navigate = useNavigate();
  
  function handleNavigate() {
    navigate("/destinations"); 
  }
  return (
    <>
      <div class="responsive-container-block bigContainer">
        <div class="responsive-container-block Container bottomContainer">
          <img class="mainImg" src={Image} alt="main_image" />
          <div class="allText bottomText">
            <h2 class="text-blk headingText">How We Are</h2>
            <p class="text-blk description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
              pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo
              in ullamcorper quis vestibulum ligula elementum ut.
            </p>
            <button type="button" class="explore" onClick={handleNavigate}>
              Explore
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowWeAre;
