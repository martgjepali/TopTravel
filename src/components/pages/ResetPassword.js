import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";
import "./ResetPassword.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const query = useQuery();
  const resetCode = query.get("secret_token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, loading, error, message } = useResetPassword();

  useEffect(() => {
    console.log("Secret Token:", resetCode);
  }, [resetCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await resetPassword(resetCode, newPassword, confirmPassword);
    setNewPassword("");
    setConfirmPassword();

  };

  return (
    <div className="container">
      <div className="title">Reset your Password?</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details-fgp">
            <div className="input-box">
              <span className="details">Enter Your New Password</span>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Repeat Password</span>
              <input
                type="password"
                placeholder="Repeat your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="button btn-signUp"
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
