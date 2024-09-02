import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useActivateAccount from "../../hooks/useActivateAccount";

const ActivateAccount = () => {
  const navigate = useNavigate();
  const { setEmail, setCode, activateAccountHandler, loading, success, error } =
    useActivateAccount();

  useEffect(() => {
    if (success) {
      toast.success("User created successfully, You can Log in now.");
      // Redirect to login page
      setTimeout(() => navigate("/sign-in"), 2000);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await activateAccountHandler();
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details-fgp">
              <div className="input-box">
                <span className="details">E-mail</span>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your E-mail"
                />
              </div>
              <div className="input-box">
                <span className="details">Verification Code</span>
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter activation code"
                />
              </div>
            </div>
            <button class="button btn-signUp" type="submit" disabled={loading}>
              {loading ? "Activating..." : "Activate Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;
