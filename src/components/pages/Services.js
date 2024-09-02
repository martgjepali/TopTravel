import { useEffect, useState, useRef } from "react";
import useAllDestinations from "../../hooks/useAllDestinations";
import useAllPackages from "../../hooks/usePackages";
import DestinationCards from "../DestinationCards";
import PackagesCards from "../PackagesCards";
import Footer from "../Footer";
import MoonLoader from "react-spinners/MoonLoader";
import "../../App.css";
import "../Cards.css";
import "./Services.css";

export default function Services() {
  const destinationsSectionRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const {
    destinations,
    loading: destinationsLoading,
    error: destinationsError,
  } = useAllDestinations();
  const {
    packages,
    loading: packagesLoading,
    error: packagesError,
  } = useAllPackages();

  const itemsPerPage = 4;
  const [currentPageDestinations, setCurrentPageDestinations] = useState(1);
  const [currentPagePackages, setCurrentPagePackages] = useState(1);

  const indexOfLastDestination = currentPageDestinations * itemsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - itemsPerPage;
  const currentDestinations = destinations.slice(
    indexOfFirstDestination,
    indexOfLastDestination
  );

  const indexOfLastPackage = currentPagePackages * itemsPerPage;
  const indexOfFirstPackage = indexOfLastPackage - itemsPerPage;
  const currentPackages = packages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const totalDestinationPages = Math.ceil(destinations.length / itemsPerPage);
  const totalPackagePages = Math.ceil(packages.length / itemsPerPage);

  const [showSpinner, setShowSpinner] = useState(false);
  const [forceSpinnerDisplay, setForceSpinnerDisplay] = useState(false);

  useEffect(() => {
    if (destinationsLoading || packagesLoading) {
      setShowSpinner(true);
      setForceSpinnerDisplay(true);
      setTimeout(() => {
        setForceSpinnerDisplay(false);
      }, 2000); // Ensures spinner shows for at least 4 seconds
    } else if (!forceSpinnerDisplay) {
      setShowSpinner(false);
    }
  }, [destinationsLoading, packagesLoading, forceSpinnerDisplay]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const paginateDestinations = (pageNumber) => {
    setCurrentPageDestinations(pageNumber);
    if (destinationsSectionRef.current) {
      destinationsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginatePackages = (pageNumber) => setCurrentPagePackages(pageNumber);

  if (showSpinner) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MoonLoader
          height="100"
          width="100"
          color="#ff7300" // Adjust the color as needed
          ariaLabel="loading-indicator"
        />
      </div>
    );
  }

  if (destinationsError || packagesError) {
    return (
      <div>
        Error loading data:{" "}
        {destinationsError?.message || packagesError?.message}
      </div>
    );
  }

  console.log("Packages:", packages);
  console.log("Destinations:", destinations);

  return (
    <>
      <h1 className="services" data-aos="zoom-in-right">SERVICES</h1>
      <section className="heading" ref={destinationsSectionRef}>
        <h2>Explore these destinations</h2>
        <div className="services-container">
          <div className="services-wrapper">
            <ul className="services-items">
              {currentDestinations.map((destination) => (
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
          </div>
          <div className="pagination">
            {Array.from({ length: totalDestinationPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  paginateDestinations(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="heading">
        <h2>Activities we think you would enjoy</h2>
        <div className="services-container">
          <div className="services-wrapper">
            <ul className="services-items">
              {currentPackages.map((packageItem) => (
                <PackagesCards
                  key={packageItem.PackageID}
                  path={`/packages/${packageItem.PackageID}`}
                  Country={packageItem.Country}
                  image={{
                    src: packageItem.Image.src,
                    title: packageItem.Image.title,
                  }}
                  PackageName={packageItem.PackageName}
                  Description={packageItem.Description}
                  Price={packageItem.Price}
                />
              ))}
            </ul>
          </div>
          <div className="pagination">
            {Array.from({ length: totalPackagePages }, (_, index) => (
              <button
                key={index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  paginatePackages(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
