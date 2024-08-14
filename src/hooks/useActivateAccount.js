import { useState } from "react";
import { activateAccount } from "../apis/accountActivationApi";
import { toast } from "react-toastify";

const useActivateAccount = () => {
  const [email, setEmail] = useState(""); // Added state for email
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const activateAccountHandler = async () => {
    // No longer pass code as argument
    setLoading(true);
    try {
      const response = await activateAccount({ email, code });
      if (response && response.success) {
        toast.success(response.message || "Account activated successfully!");
      } else {
        toast.error(
          response.message || "Failed to activate account. Please try again."
        );
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error activating account:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    setEmail, // Make setEmail available for binding in form
    setCode,
    activateAccountHandler,
    loading,
  };
};

export default useActivateAccount;
