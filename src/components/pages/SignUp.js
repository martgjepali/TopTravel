import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      toast.success("User created successfully, You can Log in now.");
    } catch (error) {
      toast.error("Error creating user. Please try again.");
    }
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
      <div class="container">
        <div class="title">Sign Up</div>
        <div class="content">
          <form onSubmit={handleSubmit}>
            <div class="user-details">
              <div class="input-box">
                <span class="details">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Email</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Phone Number</span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your number"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Date of Birth</span>
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
              class="button btn-signUp"
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
          <p class="account-info">
            Already have an account?{" "}
            <Link to="/sign-in" class="sign-in-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
