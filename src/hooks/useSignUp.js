import { useState } from 'react';
import { createUser } from "../apis/authApi"

const useCreateUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await createUser(userData);
      setUser(response);
      setSuccess('User created successfully');
    } catch (error) {
      setError(error.detail || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    success,
    handleCreateUser,
  };
};

export default useCreateUser;
