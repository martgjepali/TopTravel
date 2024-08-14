import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../apis/authApi";
import { toast } from "react-toastify";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      console.log("Stored user:", storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);
  
  const loginHandler = async (email, password) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      sessionStorage.setItem("session_token", data.session_token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/"); // Example redirection on successful login
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Incorrect email or passwrod"); 
    } finally {
      setLoading(false);
    }
  };
  

  const logoutHandler = async () => {
    const token = localStorage.getItem("token"); 
    console.log("Logging out...", "Token:", token);
    if (token) {
      try {
        await logout(token);
      } catch (error) {
        console.error("Logout request failed", error);
      }
    }
    sessionStorage.removeItem("session_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();

    setUser(null);
    console.log("All tokens and user data cleared.");
  };
  
  return {
    user,
    loading,
    login: loginHandler,
    logout: logoutHandler,
  };
}
