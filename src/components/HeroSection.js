import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchProvider";
import { useUserProfile } from "../hooks/useUserProfile";
import DatePicker from "react-datepicker";
import useAllDestinations from "../hooks/useAllDestinations";
import usePackagesByDestinationId from "../hooks/usePackagesByDestinationId";
import Dropdown from "react-dropdown";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "../App.css";
import "./HeroSection.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Slide_1 from "../assets/img-1.jpg";
import Slide_2 from "../assets/cabin.jpeg";
import Slide_3 from "../assets/sea.jpeg";

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
      {/* <video
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      /> */}

      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000, // 3-second delay
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Slide_1} className="images" alt="slide_1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={Slide_2} className="images" alt="slide_2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={Slide_3} className="images" alt="slide_3" />
        </SwiperSlide>
      </Swiper>

      <div className="date-container-overlay">
        <h1 className="header-hero">ADVENTURE AWAITS</h1>
        {/* <p>What are you waiting for?</p> */}

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
    </div>
  );
}

export default HeroSection;
