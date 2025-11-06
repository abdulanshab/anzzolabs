import React from "react";
import { Link } from "react-router-dom";
import "./responsive/Navbar.scss";

const Navbar = () => {
  return (
    <div className="container navbar-container py-5 w-full z-50 flex items-center justify-between sticky top-0 mix-nav mobile">
      <div className="flex items-center nav">
        <a href="/">
          <h1 className="logo text-2xl">
            ANZZOLABS<span>®</span>
          </h1>
        </a>
        <p className="tagline">Design & Dev Studio</p>
      </div>

      <div className="links flex gap-5 text-[14px] menu">
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/works" className="nav-link">
          Works
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
