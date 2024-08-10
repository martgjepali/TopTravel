import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import "../../App.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthContext(); // This should use the login method from your auth context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Attempt to log in with the provided credentials
      setEmail("");
      setPassword("");
      navigate('/'); // Redirect to home page or dashboard as appropriate after login
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally add error handling here to inform the user of login failure
    }
  };

  return (
    <div className="container">
      <div className="title">Sign In</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="button btn-signUp"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="account-info">
          Don't have an account?{" "}
          <Link to="/sign-up" className="sign-in-link">
            Sign Up
          </Link>
        </p>
<<<<<<< HEAD
        <p className="forgot-password">
          <Link to="/forgot-password">
            Forgot your password?
          </Link>
        </p>
=======
>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae
      </div>
    </div>
  );
};

export default SignIn;
