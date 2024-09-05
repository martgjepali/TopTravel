import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthContext(); // This should use the login method from your auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <ToastContainer />
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
            <Link to="/sign-up" className="sign-in-link links">
              Sign Up
            </Link>
          </p>
          <p className="forgot-password">
            <Link className="links" to="/forgot-password">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
