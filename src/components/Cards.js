import React, { useState, useEffect, forwardRef } from "react";
import useLimitedDestinations from "../hooks/useLimitedDestinations";
import DestinationCards from "./DestinationCards";
import "./Cards.css";

const Cards = forwardRef((props, ref) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [skip, setSkip] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [noMoreDestinations, setNoMoreDestinations] = useState(false);
  const { destinations: fetchDestinations, loading, error, filters } = useLimitedDestinations(skip, 4);

  useEffect(() => {
    if (skip === 0) {
      setDestinations(fetchDestinations);
    } else {
      const newDestinations = fetchDestinations.filter(
        (newDest) => !destinations.some((dest) => dest.DestinationID === newDest.DestinationID)
      );
      setDestinations((prevDestinations) => [...prevDestinations, ...newDestinations]);
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
    <div ref={ref} className="cards">
      <h1>Check out these epic destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
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
          {loading && <div>Loading...</div>}
          {!loading && destinations.length === 0 && (
            <div className="no-more-destinations">
              {noDestinationsMessage()}
            </div>
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
})
export default Cards;
