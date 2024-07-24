import { useState } from 'react';
import { resetForgetPassword } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const navigatoTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const resetPassword = async (secret_token, new_password, confirm_password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetForgetPassword(secret_token, new_password, confirm_password);
      if (response && response.success) {
        setMessage(response.message);
        navigatoTo('/sign-in');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, message };
};

export default useResetPassword;
