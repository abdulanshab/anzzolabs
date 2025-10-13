import React from "react";
import { ShowreelVideo } from "../assets";
import "./responsive/Showreel.scss"

const Showreel = () => {
  return (
    <div className="w-full h-[100vh] mt-[50px] overflow-hidden showreel">
      <video
        src={ShowreelVideo}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Showreel;
