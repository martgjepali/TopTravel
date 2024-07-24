import { useState } from "react";
import { resetPassword } from "../apis/authApi";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetPassword(email);
      if (response && response.success) {
        setMessage(response.message);
      } else {
        setError("Failed to send password reset link. Please try again.");
      }
    } catch (error) {
      setError("Failed to send password reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, message };
};

export default useForgotPassword;
