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
import { AuthProvider } from "./contexts/AuthProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
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
            </Routes>
          </ScrollToTop>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
