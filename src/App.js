import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import { SearchProvider } from "./contexts/SearchProvider";
import { Routes, Route } from "react-router-dom";
import Services from "./components/pages/Services";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Destination from "./components/pages/Destination";
import ScrollToTop from "./components/ScrollToTop";
import Packages from "./components/pages/Packages";
import Booking from "./components/pages/Booking";
import AuthGuard from "./auth/AuthGuard";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import ActivateAccount from "./components/pages/ActivateAccount";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" exact element={<Services />} />
            <Route path="/sign-in" exact element={<SignIn />} />
            <Route path="/sign-up" exact element={<SignUp />} />
            <Route
              path="/services/activity/:destinationId"
              element={<Destination />}
            />
            <Route
              path="/filtered-packages/:destinationId"
              element={<Packages />}
            />
            <Route path="/packages/:packageId" element={<Destination />} />
            <Route
              path="/book-package/:packageId"
              element={
                <AuthGuard>
                  <Booking />
                </AuthGuard>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/activate-account" element={<ActivateAccount />} />
          </Routes>
        </ScrollToTop>
      </SearchProvider>
    </div>
  );
}

export default App;
