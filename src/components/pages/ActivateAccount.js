import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useActivateAccount from "../../hooks/useActivateAccount";

const ActivateAccount = () => {
  const navigateTo = useNavigate();
  const { setEmail, setCode, activateAccountHandler, loading } =
    useActivateAccount();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await activateAccountHandler();
      if (success) {
        toast.success("Account activated successfully!");
        navigateTo("/sign-in");
      }
    } catch (error) {
      toast.error("Failed to activate account. Please try again.");
    }
  };
  return (
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
  );
};

export default ActivateAccount;
