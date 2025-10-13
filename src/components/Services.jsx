import React, { useRef } from "react";
import { gsap } from "gsap";
import { Img1, Img2, Img3, Img4, Img5 } from "../assets";
import "./responsive/Services.scss"

const services = [
  { id: 1, name: "Branding", img: Img1 },
  { id: 2, name: "Creative Designing", img: Img2 },
  { id: 3, name: "UI/UX Designing", img: Img3 },
  { id: 4, name: "Website development", img: Img4 },
  { id: 5, name: "App development", img: Img5 },
];

const Services = () => {
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  const handleMouseEnter = (index) => {
    // Move text to the right
    gsap.to(textRefs.current[index], {
      x: 40,
      duration: 0.3,
      ease: "power2.out",
    });

    // Fade in image with slight scale
    gsap.to(imageRefs.current[index], {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    // Move text back
    gsap.to(textRefs.current[index], {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Fade out image and scale down slightly
    gsap.to(imageRefs.current[index], {
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="container relative">
      <div className="my-[150px] relative services-container">
        <p className="font-medium mb-10">[ services ]</p>

        {services.map((service, i) => (
          <div
            key={service.id}
            className="w-full h-25 cursor-pointer border-b border-[#D9D9D9] flex items-center gap-40 relative services-item"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <p className="text-[12px] font-medium service-id">{`0${service.id}`}</p>
            <p
              ref={(el) => (textRefs.current[i] = el)}
              className="text-[36px] font-medium uppercase relative z-10 services-text"
            >
              {service.name}
            </p>

            {/* Hover image */}
            <img
              ref={(el) => (imageRefs.current[i] = el)}
              src={service.img}
              alt={service.name}
              className="absolute right-[150px] z-10 top-0 w-[280px] h-[180px] pointer-events-none object-cover -rotate-3 services-image"
              style={{ opacity: 0, scale: 0.95 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
