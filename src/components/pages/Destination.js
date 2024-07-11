import { useParams } from "react-router-dom";
import usePackageById from "../../hooks/usePackageById";

import Footer from "../Footer";

export default function Destination() {
  const { packageId } = useParams(); // Only using packageId as per your request
  const { packageDetails: details, loading, error } = usePackageById(packageId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading package details: {error.message}</div>;

  const imagePath = details?.Image?.src;
  const backgroundImageUrl = imagePath
    ? imagePath
    : "../public/images/img-9.jpg";

  return (
    <>
      <div
        className="destination"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="destination-container">
        <div className="info-wrapper">
          <h2>
            {details?.PackageName ||
              "Explore the hidden waterfall inside the Amazon Jungle"}
          </h2>
          <p>
            {details?.Description ||
              "Visit the Amazon Jungle, admire the hidden waterfalls, and enjoy a kayak tour..."}
          </p>
          <p>
            <strong>Country:</strong> {details?.Country || "Unknown"}
          </p>
          <p>
            <strong>Duration:</strong> {details?.Duration || "N/A"}
          </p>
          <p>
            <strong>Start Date:</strong> {details?.StartDate || "N/A"}
          </p>
          <p>
            <strong>End Date:</strong> {details?.EndDate || "N/A"}
          </p>

          <h3>Experience</h3>
          <h4>Highlights</h4>
          <ul>
            {details?.Highlights?.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            )) || (
              <>
                <li>
                  Explore the Maruaga Cave complex in the middle of the Amazon
                  jungle
                </li>
                <li>
                  Swim in natural pools and refreshing rapids on this amazing
                  tour
                </li>
                <li>
                  Enjoy an easy hike through the stunning Amazon rainforest
                </li>
                <li>
                  Visit the Judea Cave and bathe in the beautiful waterfall
                </li>
              </>
            )}
          </ul>
          <h4>Full description</h4>
          <p>
            {details?.FullDescription ||
              "Explore the paradise of Presidente Figueiredo on a full-day tour from Manaus..."}
          </p>
        </div>

        <div className="booking-container">
          <div className="booking-wrapper">
            <section className="booking-info">
              <h5>From</h5>
              <p className="price">€ {details?.Price || 78}</p>
              <p className="per-person">per person</p>
            </section>
            <button type="button" className="btn-book">
              Book now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
