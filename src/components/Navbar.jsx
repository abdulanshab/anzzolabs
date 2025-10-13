import React from "react";
import { Link } from "react-router-dom";
import "./responsive/Navbar.scss";

const Navbar = () => {
  return (
    <div className="container py-5 w-full z-50 flex items-center justify-between sticky top-0 mobile">
      <div className="flex items-center nav">
        <h1 className="text-2xl">
          ANZZOLABS<span>®</span>
        </h1>
        <p className="font-medium text-[14px] pl-88">Design & Dev Studio</p>
      </div>
      <div className="links flex gap-5 font-medium text-[14px] menu">
        <Link
          to="/"
          className="relative overflow-hidden 
                        before:content-[''] before:absolute before:bottom-0 before:right-0 
                        before:w-0 before:h-[1.5px] before:bg-black 
                        before:transition-all before:duration-300 
                        hover:before:left-0 hover:before:w-full"
        >
          Contact
        </Link>
        <Link
          to="/"
          className="relative overflow-hidden 
                        before:content-[''] before:absolute before:bottom-0 before:right-0 
                        before:w-0 before:h-[1.5px] before:bg-black 
                        before:transition-all before:duration-300 
                        hover:before:left-0 hover:before:w-full"
        >
          Works
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
