import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
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
import About from "./components/pages/About";
import HowWeAre from "./components/pages/HowWeAre";
import HowItWorks from "./components/pages/HowItWorks";
import Testimonials  from "./components/pages/Testimonials";
import PublicRoute from "./routes/PublicRoute";
import MoonLoader from "react-spinners/MoonLoader";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on a per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    setTimeout(() => {
      setLoading(false); // Set loading to false after the content is ready
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MoonLoader
          height="100"
          width="100"
          color="#ff7300" // Adjust the color as needed
          ariaLabel="loading-indicator"
        />
      </div>
    ); // Show the loader while loading is true
  }

  return (
    <div className="App">
      <SearchProvider>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" exact element={<Services />} />
            <Route path="/contact" exact element={<Contact />} />
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
            <Route path="/about-us" element={<About />} />
            <Route path="/how-we-are" element={<HowWeAre />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </ScrollToTop>
      </SearchProvider>
    </div>
  );
}

export default App;
