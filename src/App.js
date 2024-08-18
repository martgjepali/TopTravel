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
import PaymentSuccessPage from "./components/pages/PaymentSuccessPage";
import PaymentErrorPage from "./components/pages/PaymentErrorPage";
import PublicRoute from "./routes/PublicRoute";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" exact element={<Services />} />
            <Route
              path="/sign-in"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
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
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-error" element={<PaymentErrorPage />} />
          </Routes>
        </ScrollToTop>
      </SearchProvider>
    </div>
  );
}

export default App;
