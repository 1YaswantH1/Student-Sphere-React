import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logo from "/images/logo.jpg";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false); // Manage active state for mobile view

  const toggleNav = () => {
    setIsActive((prev) => !prev); // Toggle navigation menu
  };

  return (
    <nav className={`navbar ${isActive ? "nav-active" : ""}`}>
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <ul className={`nav-links ${isActive ? "nav-active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sports">Sports</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        {/* <li>
          <Link to="/complaint-box">Complaint Box</Link>
        </li> */}
        <li>
          <Link to="/ideas">Ideas</Link>
        </li>
        <li>
          <Link to="/polls">Polls</Link>
        </li>
        <li>
          <Link to="/signin">Sign In / Sign Up</Link>
        </li>
      </ul>
      <div
        onClick={toggleNav} // Use toggle function for clarity
        className={`hamburger ${isActive ? "active" : ""}`}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
