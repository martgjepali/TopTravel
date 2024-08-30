import React, { useState, useEffect } from "react";
import useLimitedDestinations from "../hooks/useLimitedDestinations";
import DestinationCards from "./DestinationCards";
import MoonLoader from "react-spinners/MoonLoader";
import "./Cards.css";

function Cards() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [skip, setSkip] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [noMoreDestinations, setNoMoreDestinations] = useState(false);
  const {
    destinations: fetchDestinations,
    loading,
    error,
    filters,
  } = useLimitedDestinations(skip, 4);

  const [showSpinner, setShowSpinner] = useState(false);
  const [forceSpinnerDisplay, setForceSpinnerDisplay] = useState(false);
  const [smallSpinner, setSmallSpinner] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
      setForceSpinnerDisplay(true); 
      setTimeout(() => {
        setForceSpinnerDisplay(false); 
      }, 3000);
    }

    if (!loading && !forceSpinnerDisplay) {
      setShowSpinner(false);
      setSmallSpinner(false);
    }
  }, [loading, forceSpinnerDisplay]);

  useEffect(() => {
    if (skip === 0) {
      setDestinations(fetchDestinations);
    } else {
      const newDestinations = fetchDestinations.filter(
        (newDest) =>
          !destinations.some(
            (dest) => dest.DestinationID === newDest.DestinationID
          )
      );
      setDestinations((prevDestinations) => [
        ...prevDestinations,
        ...newDestinations,
      ]);
    }

    if (fetchDestinations.length === 0 && skip !== 0) {
      setNoMoreDestinations(true);
    } else {
      setNoMoreDestinations(false);
    }
  }, [fetchDestinations, skip]);

  useEffect(() => {
    setSkip(0);
    setDestinations([]);
    setNoMoreDestinations(false);
  }, [filters]);

  const loadMoreDestinations = () => {
    if (!noMoreDestinations) {
      setSmallSpinner(true);
      setSkip((prevSkip) => prevSkip + 4);
    }
  };

  if (error) {
    return <div>Error loading destinations: {error.message}</div>;
  }

  const noDestinationsMessage = () => {
    if (filters.startDate || filters.endDate) {
      return "No destinations available for the selected dates.";
    } else if (filters.location) {
      return `No destinations found for "${filters.location}".`;
    } else {
      return "No destinations found.";
    }
  };

  return (
    <div className="cards">
      <h1 data-aos="fade-up">Check out these epic destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items" >
            {destinations.map((destination) => (
              <DestinationCards
                key={destination.DestinationID}
                path={`/filtered-packages/${destination.DestinationID}`}
                Country={destination.Country}
                image={{
                  src: `${API_URL}/static/images/${destination.image.src
                    .split("\\")
                    .pop()}`,
                  title: destination.image.title,
                }}
                DestinationName={destination.DestinationName}
                Description={destination.Description}
              />
            ))}
          </ul>
          {showSpinner && (
            <MoonLoader  
              color="#ff7300"
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          {!showSpinner &&
            destinations.map((dest) => (
              <div key={dest.DestinationID}>{dest.name}</div>
            ))}
          {!showSpinner && noMoreDestinations && (
            <div>No more destinations available.</div>
          )}
          {!loading && destinations.length > 0 && !noMoreDestinations && (
            <button onClick={loadMoreDestinations} className="load-more-button">
              Load More
            </button>
          )}
          {!loading && noMoreDestinations && (
            <div className="no-more-destinations">
              {noDestinationsMessage()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cards;
