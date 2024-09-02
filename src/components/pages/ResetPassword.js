import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const resetCode = query.get("secret_token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, loading, error, success } = useResetPassword();

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully");
      // Redirect to login page
      setTimeout(() => navigate("/sign-in"), 2000);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    await resetPassword(resetCode, newPassword, confirmPassword);
    setNewPassword("");
    setConfirmPassword();
  };

  return (
    <>
      <ToastContainer />
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
      </div>
    </>
  );
};

export default ResetPassword;
