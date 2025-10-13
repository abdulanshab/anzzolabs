import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Img1, Img2, Img3, Img4, Img5 } from "../assets"; // import all 5 images

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef([]);

  const images = [Img1, Img2, Img3, Img4, Img5];

  // 1. New useEffect to manage body overflow
  useEffect(() => {
    // Add overflow: hidden to the body when the component mounts
    document.body.style.overflow = "hidden";

    // Clean up: Remove overflow: hidden when the component unmounts (after onFinish is called)
    return () => {
      document.body.style.overflow = "";
    };
  }, []); // Empty dependency array ensures it runs only on mount and unmount

  useEffect(() => {
    // Animate center text
    gsap.fromTo(
      textRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animate images in sequence at bottom-right
    const imageTimeline = gsap.timeline({ repeat: -1 });
    images.forEach((_, i) => {
      imageTimeline.to(imageRefs.current[i], { opacity: 1, duration: 0.2 });
      imageTimeline.to(imageRefs.current[i], {
        opacity: 1,
        duration: 0.2,
        delay: 0.2,
      });
    });

    // Progress animation
    const progressTimeline = gsap.timeline();
    progressTimeline.to(
      { value: 0 },
      {
        value: 100,
        duration: 5, // total duration
        ease: "power1.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          // Stop the repeating image animation
          imageTimeline.kill();

          // Fade out center text
          gsap.to(textRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          });

          // Fade out images
          gsap.to(imageRefs.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            stagger: 0.1,
          });

          // Fade out progress number
          gsap.to(".progress-number", {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          });

          // Slide up the container
          gsap.to(containerRef.current, {
            y: "-100%",
            opacity: 1,
            duration: 1,
            ease: "power2.in",
            delay: 0.2,
            onComplete: () => {
              if (onFinish) onFinish();
            },
          });
        },
      }
    );
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white font-sans z-[9999]"
    >
      <p
        ref={textRef}
        className="font-medium text-[15px] text-center overflow-hidden"
        style={{ display: "inline-block" }}
      >
        Anzzolabs – Design & Dev Studio
      </p>

      <div className="absolute bottom-5 right-5 text-right">
        <div className="relative w-[150px] h-[100px] mx-auto">
          {images.map((img, index) => (
            <img
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              src={img}
              alt={`preloader-${index}`}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0"
            />
          ))}
        </div>
        <div className="mt-2 text-[18px] font-medium progress-number">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;