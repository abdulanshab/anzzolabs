import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Me } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const Founder = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for smooth sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(imgRef.current, {
        opacity: 0,
        x: -150,
        rotate: -5,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        textRefs.current,
        {
          opacity: 0,
          x: 100,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container">
      <div
        ref={sectionRef}
        className="hidden md:flex my-[100px] bg-[#111] h-[500px] w-full overflow-hidden relative founder-section"
      >
        {/* Founder Image */}
        <img
          ref={imgRef}
          src={Me}
          alt="Founder"
          className="w-[600px] h-auto object-cover relative top-10 founder-image"
        />

        {/* Text Content */}
        <div className="flex flex-col ml-1 absolute left-[500px] pt-[120px] founder-content">
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="text-white font-medium"
          >
            [ about founder ]
          </p>

          <p
            ref={(el) => (textRefs.current[1] = el)}
            className="text-white font-semibold text-[65px] pt-10 leading-[70px]"
          >
            Abdul Hanshab
          </p>

          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="text-white text-[16px] leading-[22px] max-w-[600px] pt-6"
          >
            At Anzzolabs, we craft digital experiences that drive results. From
            startups to established brands, we build everything from MVPs to
            full-scale SaaS platforms blending design, development, and strategy
            to help businesses grow in the digital world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;
