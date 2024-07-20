import { Link } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  return (
    <div className="container">
      <div className="title">Sign In</div>
      <div className="content">
        <form>
          <div className="user-details">
            <div className="input-box">
              <span className="details">New Password</span>
              <input type="password" placeholder="Enter your new password" required />
            </div>
            <div className="input-box">
              <span className="details">Repeat Password</span>
              <input
                type="password"
                placeholder="Retype your new password"
                required
              />
            </div>
          </div>
          <button className="button btn-signUp" type="submit">
            Submit
          </button>
        </form>
        <p className="account-info">
          Already have an account?{" "}
          <Link to="/sign-In" className="sign-in-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
