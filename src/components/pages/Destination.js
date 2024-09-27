import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import usePackageById from "../../hooks/usePackageById";
import Reviews from "../Reviews";
import Modal from "react-modal";
import MoonLoader from "react-spinners/MoonLoader";
import useReviews from "../../hooks/useReviews";
import ReactStars from "react-rating-stars-component";

import Footer from "../Footer";
import "./Destination.css";

Modal.setAppElement("#root");

export default function Destination() {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const { averageRating } = useReviews(packageId);
  const { packageDetails: details, loading, error } = usePackageById(packageId);
  const { user } = useAuthContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [showSpinner, setShowSpinner] = useState(false);
  const [forceSpinnerDisplay, setForceSpinnerDisplay] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
      setForceSpinnerDisplay(true);
      setTimeout(() => {
        setForceSpinnerDisplay(false);
      }, 3000); // Ensures spinner shows for at least 4 seconds
    } else if (!forceSpinnerDisplay) {
      setShowSpinner(false);
    }
  }, [loading, forceSpinnerDisplay]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
          color="#FFA500" // Adjust the color as needed
          ariaLabel="loading-indicator"
        />
      </div>
    );
  }
  if (error) return <div>Error loading package details: {error.message}</div>;

  const imagePath = details?.Image?.src;
  const backgroundImageUrl = imagePath
    ? imagePath
    : "../public/images/img-9.jpg";

  const navigateToBooking = () => {
    navigate(`/book-package/${packageId}`);
  };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   navigate("/sign-in");
  // };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <div
          className="destination"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
        <div className="destination-container" data-aos="fade-up">
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

            {/* <h3>Experience</h3>
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
          </ul> */}
            <h4>Average Rating:</h4>
            <ReactStars
              count={5}
              value={averageRating}
              size={24}
              isHalf={true}
              edit={false} // Read-only for average rating
              activeColor="#ffd700"
            />
            <button
              type="button"
              className="btn-review"
              onClick={openReviewModal}
            >
              Leave a Review
            </button>

            <Modal
              isOpen={isReviewModalOpen}
              onRequestClose={closeReviewModal}
              contentLabel="Leave a Review"
              className="modal"
              overlayClassName="overlay"
            >
              <h2>Write Your Review</h2>
              <Reviews packageId={packageId} />
              {/* <button
                type="button"
                className="btn-close"
                onClick={closeReviewModal}
              >
                Close
              </button> */}
            </Modal>
          </div>
          <div className="booking-container">
            <div className="booking-wrapper">
              <section className="booking-info">
                <p className="price">€ {details?.Price || 78}</p>
                <p className="per-person">per person</p>
              </section>
              <button
                type="button"
                className="btn-book"
                onClick={() => navigateToBooking(packageId)}
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Required"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Authentication Required</h2>
        <p>You must be logged in to make a booking.</p>
        <button type="button" className="btn-book" onClick={closeModal}>
          Sign In
        </button>
      </Modal> */}
      <Footer />
    </>
  );
}
