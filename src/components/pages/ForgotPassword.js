import { useState } from "react";
import useForgotPassword from "../../hooks/useForgotPassword";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading, error, message } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="container">
      <div className="title">Forgot your Password?</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details-fgp">
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
          </div>
          <button className="button btn-signUp" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="account-info">
          Already have an account?{" "}
          <Link to="/sign-in" className="sign-in-link">
            Sign In
          </Link>
        </p>
      </div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
