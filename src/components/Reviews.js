import React, { useState } from "react";
import useReviews from "../hooks/useReviews";
import ReactStars from "react-rating-stars-component";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

const Reviews = ({ packageId }) => {
  const { reviews, averageRating, addReview, isLoading } =
    useReviews(packageId);
  const [newReviewText, setNewReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleReviewSubmit = async () => {
    if (!user) {
      setModalIsOpen(true); // Open modal if user is not logged in
      return;
    }

    if (rating !== 0 && newReviewText.trim()) {
      await addReview({
        PackageID: packageId,
        Comment: newReviewText,
        Rating: rating,
        UserID: user.user_id,
      });
      setNewReviewText("");
      setRating(0); // Reset rating after submitting
    } else {
      toast.warning("Please add a comment and a rating before submitting.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/sign-in");
  };

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="reviews-container">
      <ToastContainer />
      {/* <h3>Average Rating:</h3>
      <ReactStars
        count={5}
        value={averageRating}
        size={24}
        isHalf={true}
        edit={false} // Read-only for average rating
        activeColor="#ffd700"
      /> */}
      <div>
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          placeholder="Add your review here..."
        />
        <div className="stars-container">
          <ReactStars
            count={5}
            value={averageRating}
            size={24}
            isHalf={true}
            edit={false}
            activeColor="#ffd700"
          />
        </div>

        <button className="rating-btn" onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Required"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Authentication Required</h2>
        <p>You must be logged in to submit a review.</p>
        <button type="button" className="btn-book" onClick={closeModal}>
          Sign In
        </button>
      </Modal>
    </div>
  );
};

export default Reviews;
