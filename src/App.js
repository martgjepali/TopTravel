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
<<<<<<< HEAD
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
=======
>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae
import "./App.css";

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
              <Route path="/services/activity/:destinationId" element={<Destination />} />
              <Route path="/filtered-packages/:destinationId" element={<Packages />} />
              <Route path="/packages/:packageId" element={<Destination />} />
              <Route path="/book-package" element={<AuthGuard><Booking /></AuthGuard>} />
<<<<<<< HEAD
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
=======
>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae
            </Routes>
          </ScrollToTop>
        </SearchProvider>
    </div>
  );
}

export default App;
