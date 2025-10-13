import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./responsive/About.scss";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;

    // Split heading into words
    const split = new SplitType(heading, { types: "words" });
    const words = split.words;

    // Timeline for word animation
    const tl = gsap.timeline();

    // Animate each word to blue sequentially
    tl.to(words, {
      color: "#3545D6",
      duration: 0.5, // make it slower for smoothness
      stagger: 0.15, // stagger each word
      ease: "power1.inOut",
    });

    // After animation finishes, return all words to black
    tl.to(words, {
      color: "#000000",
      duration: 0.5,
      ease: "power1.inOut",
    });

    // ScrollTrigger to control timeline with smooth forward/backward
    ScrollTrigger.create({
      animation: tl,
      trigger: heading,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1, // smooth scrubbing
    });
  }, []);

  return (
    <div className="container ">
      <div className="mt-[100px] flex gap-[110px] about">
        <p className="font-medium">[ about us ]</p>
        <div className="pt-20 ">
          <p
            ref={headingRef}
            className="text-[60px] font-medium leading-[1.2] heading"
          >
            Redefining the Digital Space
          </p>
          <p className="text-[18px] opacity-50 font-regular pt-3 leading-6 sub-text ">
            We fuse creativity and technology to craft impactful digital
            experiences <br />
            Elevating brands, inspiring users, and delivering real results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
