import React from "react";
import "../styles/App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#section1">About</a></li>
        <li><a href="#section2">Gallery</a></li>
        <li><a href="#section3">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;