import { useSearch } from "../contexts/SearchProvider";
import "../App.css";
import "./HeroSection.css";

function HeroSection({ cardsRef }) {
  const { setFilters } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setFilters({
      destinationName: formData.get("location"),
      startDate: formData.get("check-in"),
      endDate: formData.get("check-out"),
    });
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hero-container" data-aos="zoom-in">
      <video
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>

      <form className="search" onSubmit={handleSubmit}>
        <div className="search-container">
          <label>Where are you going?</label>
          <input
            name="location"
            type="text"
            placeholder="Search your location"
          />
        </div>
        <div className="row-container">
          <div className="search-container">
            <label>Check in</label>
            <input name="check-in" type="date" />
          </div>
          <div className="search-container">
            <label>Check out</label>
            <input name="check-out" type="date" />
          </div>
        </div>
        <div className="search-container">
          <button className="hero-btn" type="submit">
            Explore
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroSection;
