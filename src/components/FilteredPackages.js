import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PackagesCards from "./PackagesCards";
import usePackagesByDestinationId from "../hooks/usePackagesByDestinationId ";
import MoonLoader from "react-spinners/MoonLoader";

const FilteredPackages = () => {
  const { destinationId } = useParams();

  const [loading, setLoading] = useState(true);

  const { packages, error } = usePackagesByDestinationId(destinationId);

  const [showSpinner, setShowSpinner] = useState(false);
  const [forceSpinnerDisplay, setForceSpinnerDisplay] = useState(false);

  useEffect(() => {
    if (packages) {
      setLoading(false);
    }
  }, [packages]);

  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
      setForceSpinnerDisplay(true);
      setTimeout(() => {
        setForceSpinnerDisplay(false);
      }, 2000); // Ensures spinner shows for at least 4 seconds
    } else if (!forceSpinnerDisplay) {
      setShowSpinner(false);
    }
  }, [loading, forceSpinnerDisplay]);

  if (error) {
    return <div>Error loading packages: {error.message}</div>;
  }

  const hasPackages = packages && packages.length > 0;

  return (
    <div className="cards">
      {/* <h1 >Check out packages</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          {showSpinner ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader
                height="100"
                width="100"
                color="#FFA500" // Adjust the color as needed
                ariaLabel="loading-indicator"
              />
            </div> // Show a loading message while data is being fetched
          ) : (
            <ul className="cards__items">
              {hasPackages ? (
                packages.map((packageItem) => (
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
                ))
              ) : (
                <li>No packages found for this destination.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredPackages;
