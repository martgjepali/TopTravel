// src/hooks/useUserProfile.js
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import { getUserById } from "../apis/usersApi";

export const useUserProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user && user.user_id) {
          console.log("Fetching profile for user ID:", user.user_id);
          const data = await getUserById(user.user_id);
          console.log("Profile data fetched:", data);
          setProfile(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};
