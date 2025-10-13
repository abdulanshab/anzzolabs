import React from "react";
import "./responsive/Hero.scss";

const Hero = () => {
  const texts = [
    { text: "LUNCH", isBrand: false },
    { text: "ANZZOLABS", mark: "®", isBrand: true },
    { text: "DIGITAL", isBrand: false },
    { text: "ANZZOLABS", mark: "®", isBrand: true },
    { text: "EXPERIENCES", isBrand: false },
    { text: "ANZZOLABS", mark: "®", isBrand: true },
    { text: "THAT SHAPE", isBrand: false },
    { text: "ANZZOLABS", mark: "®", isBrand: true },
    { text: "THE FUTURE", isBrand: false },
    { text: "ANZZOLABS", mark: "®", isBrand: true },
  ];

  // Duplicate for seamless looping
  const marqueeItems = [...texts, ...texts];

  const renderMarquee = (direction = "left") => (
    <div className="overflow-hidden w-full " id="hero">
      <div
        className={`marquee flex whitespace-nowrap items-center leading-15 ${
          direction === "right" ? "marquee-right" : "marquee-left"
        }`}
      >
        {marqueeItems.map((item, index) =>
          item.isBrand ? (
            <h1 key={index} className="text-[12px] opacity-25 mx-8">
              {item.text}
              <span>{item.mark}</span>
            </h1>
          ) : (
            <p key={index} className="text-[50px] font-medium text-black mx-8">
              {item.text}
            </p>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col  ">
      {renderMarquee("left")}
      {renderMarquee("right")}
    </div>
  );
};

export default Hero;
