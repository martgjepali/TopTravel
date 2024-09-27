import { useState } from "react";
import Modal from "react-modal";
import { useAuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { user } = useAuthContext(); // Get the user from auth context
  const [modalIsOpen, setModalIsOpen] = useState(!user); // Open the modal if the user is not logged in
  const navigate = useNavigate(); // React Router navigate function

  // Function to handle closing the modal
  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/sign-in"); // Optionally navigate to the login page when the modal closes
  };

  // If the user is authenticated, render the protected children
  if (user) {
    return children;
  }

  // Otherwise, show the modal prompting the user to log in
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Login Required"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Authentication Required</h2>
      <p>You must be logged in to view this page.</p>
      <button type="button" className="btn-book" onClick={closeModal}>
        Go to Login
      </button>
    </Modal>
  );
};

export default AuthGuard;
