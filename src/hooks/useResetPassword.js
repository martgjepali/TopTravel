import { useState } from 'react';
import { resetForgetPassword } from '../apis/authApi';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const resetPassword = async (secret_token, new_password, confirm_password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetForgetPassword(secret_token, new_password, confirm_password);
      setSuccess("Password Changed Successfully");
    } catch (error) {
      setError(error.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};

export default useResetPassword;
