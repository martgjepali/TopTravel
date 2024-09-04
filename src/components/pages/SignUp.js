import { useState, useEffect } from "react";
import useCreateUser from "../../hooks/useSignUp";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import "../../App.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { user, isLoading, error, success, handleCreateUser } = useCreateUser();

  useEffect(() => {
    if (success) {
      toast.success("User created successfully, You can Log in now.");
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleCreateUser({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      Phone: phoneNumber,
      DateOfBirth: dateOfBirth,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setDateOfBirth("");
  };

  const handleGoogleLoginSuccess = () => {
    console.log("Login Success");
  };
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="title">Sign Up</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your number"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Date of Birth</span>
                <input
                  type="date"
                  placeholder="Enter your date of birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              className="button btn-signUp"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create User"}
            </button>
            {/* <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          /> */}
          </form>
          <p className="account-info">
            Already have an account?{" "}
            <Link to="/sign-in" className="sign-in-link links">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
