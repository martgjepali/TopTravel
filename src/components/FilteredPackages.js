import { useParams } from "react-router-dom";
import PackagesCards from "./PackagesCards";
import usePackagesByDestinationId from "../hooks/usePackagesByDestinationId ";

const FilteredPackages = () => {
  const { destinationId } = useParams();

  console.log("Using destination ID:", destinationId)

  const { packages, error } =
    usePackagesByDestinationId(destinationId);

  if (error) {
    return <div>Error loading packages: {error.message}</div>;
  }

  const hasPackages = packages && packages.length > 0;

  return (
    <div className="cards">
      <h1>Check out packages</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
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

        </div>
      </div>
    </div>
  );
};

export default FilteredPackages;
