import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import usePackageById from "../../hooks/usePackageById";
import Modal from "react-modal";

import Footer from "../Footer";

Modal.setAppElement("#root");

export default function Destination() {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const { packageDetails: details, loading, error } = usePackageById(packageId);
  const { user } = useAuthContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading package details: {error.message}</div>;

  const imagePath = details?.Image?.src;
  const backgroundImageUrl = imagePath
    ? imagePath
    : "../public/images/img-9.jpg";

  const navigateToBooking = () => {
    if (user) {
      navigate(`/book-package/${packageId}`);
    } else {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/sign-in");
  };

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
            <button type="button" className="btn-book" onClick={() => navigateToBooking(packageId)}>
                Book now
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Required"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Authentication Required</h2>
        <p>You must be logged in to make a booking.</p>
        <button type="button" className="btn-book" onClick={closeModal}>Sign In</button>
      </Modal>
      <Footer />
    </>
  );
}
