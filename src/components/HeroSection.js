import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchProvider";
import DatePicker from "react-datepicker";
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
  const { setFilters, filters } = useSearch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    console.log("Current Filters:", filters);
  }, [filters]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const adjustedStartDate = startDate
      ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";
    const adjustedEndDate = endDate
      ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : "";

    console.log("Adjusted Check-in Date:", adjustedStartDate);
    console.log("Adjusted Check-out Date:", adjustedEndDate);

    setFilters({
      destinationName: formData.get("location"),
      startDate: adjustedStartDate,
      endDate: adjustedEndDate,
    });
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
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Check-in Date"
              name="check-in" // Optional, helps identify in formData but not necessary for DatePicker
              className="date-picker-input"
            />
          </div>
          <div className="search-container">
            <label>Check out</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Check-out Date"
              name="check-out" // Optional, helps identify in formData but not necessary for DatePicker
              className="date-picker-input"
              minDate={startDate} // Ensures the end date is after the start date
            />
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
