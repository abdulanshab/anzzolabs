import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Img1, Img2, Img3, Img4, Img5 } from "../assets";
import "./responsive/WorkTrail.scss";

gsap.registerPlugin(ScrollTrigger);

const images = [Img1, Img2, Img3, Img4, Img5];

const WorkTrail = () => {
  const imageRefs = useRef([]);
  const wrapperRef = useRef(null);
  const textRefs = useRef([]);
  const activeRef = useRef(true);

  // Mouse trail effect
  useEffect(() => {
    gsap.set(imageRefs.current, { autoAlpha: 0 });
    const wrapper = wrapperRef.current;
    let autoHideTimeout;

    const moveHandler = (e) => {
      if (!activeRef.current) return;
      imageRefs.current.forEach((img, index) => {
        gsap.to(img, {
          x: e.clientX,
          y: e.clientY,
          autoAlpha: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "power3.out",
        });
      });

      clearTimeout(autoHideTimeout);
      autoHideTimeout = setTimeout(() => {
        gsap.to(imageRefs.current, {
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
        });
      }, 300);
    };

    wrapper.addEventListener("mousemove", moveHandler);
    wrapper.addEventListener("mouseleave", () =>
      gsap.to(imageRefs.current, { autoAlpha: 0, duration: 0.5 })
    );

    return () => {
      wrapper.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    // Cutout animation for main heading (HELPING BRANDS)
    const heading = textRefs.current[1];
    const lines = heading.innerHTML
      .split("<br>")
      .map((line) => `<div class="cutout-line">${line}</div>`)
      .join("");
    heading.innerHTML = lines;

    gsap.set(".cutout-line", { y: 50, clipPath: "inset(100% 0% 0% 0%)" });
    gsap.utils.toArray(".cutout-line").forEach((line, i) => {
      gsap.to(line, {
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // Fade + move in animation for other texts
    [0, 2, 3].forEach((i) => {
      gsap.fromTo(
        textRefs.current[i],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRefs.current[i],
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="container">
      <div
        ref={wrapperRef}
        className="relative mt-[150px] mb-[50px] py-[50px] works_caption"
      >
        {/* Trail images */}
        {images.map((img, i) => (
          <img
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            src={img}
            alt={`trail-${i}`}
            className="pointer-events-none fixed top-0 left-0 w-[210px] h-[140px] object-cover mb-work-trail-image"
            style={{
              zIndex: 999 - i,
              transform: "translate(-50%, -50%)",
              opacity: 0,
            }}
          />
        ))}

        {/* Original Layout */}
        <div className="flex justify-between items-center work-content-wrap">
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="font-medium text-[14px] m-hide"
          >
            Driven By Design
          </p>

          <p
            ref={(el) => (textRefs.current[1] = el)}
            className="font-medium text-[90px] leading-[1] text-center overflow-hidden work-heading"
          >
            HELPING BRANDS <br /> MOVE THE WORLD <br /> FORWARD
          </p>

          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="font-medium text-[14px] m-hide"
          >
            Powered By Code
          </p>
        </div>

        <p
          ref={(el) => (textRefs.current[3] = el)}
          className="text-center pt-20 text-[14px] font-medium mb-content"
        >
          Let’s build what everyone will remember
        </p>

        <style>{`
        .cutout-line {
          overflow: hidden;
          display: block;
        }
      `}</style>
      </div>
    </div>
  );
};

export default WorkTrail;
