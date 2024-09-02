import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { activateAccount } from "../apis/accountActivationApi";

const useActivateAccount = () => {
  const [email, setEmail] = useState(""); // Added state for email
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // const navigate = useNavigate();

  const activateAccountHandler = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const response = await activateAccount({ email, code });
      setSuccess("Account Activated Successfully");
      // navigate("/sign-in");
    } catch (error) {
      setError(error.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    setEmail, // Make setEmail available for binding in form
    setCode,
    activateAccountHandler,
    success,
    error,
    loading,
  };
};

export default useActivateAccount;
