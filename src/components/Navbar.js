import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useAuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo192.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { user, logout, loading } = useAuthContext();
  const [button, setButton] = useState(true);
  const isLoggedIn = !!user;

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in"); 
    closeMobileMenu();
  };

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logo} width={130} height={120} />
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            
            {isLoggedIn ? (
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links-mobile"
                  onClick={handleLogout}
                >
                  Sign Out
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
          {/* this is the children of Button component that has a buttonStyle */}

          {isLoggedIn
            ? button && (
                <Button onClick={handleLogout} buttonStyle="btn--outline">
                  Sign Out
                </Button>
              )
            : button && (
                <Button path="/sign-up" buttonStyle="btn--outline">
                  Sign Up
                </Button>
              )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
