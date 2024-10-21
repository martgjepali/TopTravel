import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchProvider";
import { useUserProfile } from "../hooks/useUserProfile";
import DatePicker from "react-datepicker";
import useAllDestinations from "../hooks/useAllDestinations";
import usePackagesByDestinationId from "../hooks/usePackagesByDestinationId";
import Dropdown from "react-dropdown";
import "../App.css";
import "./HeroSection.css";

function HeroSection({ cardsRef }) {
  const { setFilters, filters } = useSearch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Now pass startDate and endDate to the hook
  const { destinations, loading, error } = useAllDestinations(
    startDate,
    endDate
  );
  const { profile } = useUserProfile();
  const { packages } = usePackagesByDestinationId(selectedDestination?.value);

  // useEffect(() => {
  //   if (selectedDestination && packages) {
  //     const packageDates = packages.map(pkg => ({
  //       start: new Date(pkg.StartDate),
  //       end: new Date(pkg.EndDate)
  //     }));
  //     setAvailableDates(packageDates);
  //   }
  // }, [packages, selectedDestination]);

  // useEffect(() => {
  //   console.log("Current Filters:", filters);
  // }, [filters]);

  // useEffect(() => {
  //   const newDates = packages.filter(pkg => pkg.StartDate && pkg.EndDate).map(pkg => ({
  //     start: new Date(pkg.StartDate),
  //     end: new Date(pkg.EndDate)
  //   }));
  //   setAvailableDates(newDates);
  // }, [packages]);

  // const filterDates = date => {
  //   if (!availableDates.length) return false; // No dates available to filter

  //   // Normalize the selected date
  //   const checkDate = new Date(date.setHours(0, 0, 0, 0));

  //   // Check if the selected date falls within any of the package ranges
  //   return availableDates.some(({ start, end }) => {
  //     const startDate = new Date(start.setHours(0, 0, 0, 0)); // Start of the day
  //     const endDate = new Date(end.setHours(23, 59, 59, 999)); // End of the day
  //     return checkDate >= startDate && checkDate <= endDate;
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

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

    // Use the selected destination directly from the state
    if (selectedDestination) {
      setFilters({
        destinationName: selectedDestination.label,
        startDate: adjustedStartDate,
        endDate: adjustedEndDate,
      });
      if (cardsRef.current) {
        cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleChange = (option) => {
    setSelectedDestination(option);
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

      <h1 className="header-hero">ADVENTURE AWAITS</h1>

      <p>What are you waiting for?</p>

      {profile && profile.FirstName && (
        <h2 className="welcome-user">Welcome, {profile.FirstName}!</h2>
      )}

      <form className="search" onSubmit={handleSubmit}>
        <div className="search-container">
          <label>Where are you going?</label>
          <Dropdown
            options={destinations.map((dest) => ({
              value: dest.DestinationID,
              label: dest.DestinationName,
            }))}
            onChange={handleChange}
            value={selectedDestination}
            placeholder="Choose a destination"
            className="my-dropdown"
          />
        </div>
        <div className="row-container">
          <div className="search-container">
            <label>Check-in</label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              dateFormat="MM/dd/yyyy"
              placeholderText="Check-in Date"
              className="date-picker-input"
            />
          </div>
          <div className="search-container">
            <label>Check out</label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              dateFormat="MM/dd/yyyy"
              placeholderText="Check-out Date"
              className="date-picker-input"
              minDate={startDate}
            />
          </div>
        </div>
        <div className="search-container">
          <button className="hero-btn" type="submit">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroSection;
