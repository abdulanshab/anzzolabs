import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AuraBliss, flickbite } from "../assets";
import "./responsive/Projects.scss";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const aurablissRef = useRef(null);
  const flickbiteRef = useRef(null);
  const aurablissCircleRef = useRef(null);
  const flickbiteCircleRef = useRef(null);
  const aurablissArrowRef = useRef(null);
  const flickbiteArrowRef = useRef(null);

  useEffect(() => {
    // Scroll-trigger animations
    const animateCard = (card) => {
      gsap.fromTo(
        card,
        { y: 50, scale: 0.9, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    };

    [aurablissRef.current, flickbiteRef.current].forEach((card) =>
      animateCard(card)
    );

    // Continuous arrow animation using GSAP timeline
    const arrowAnimation = (arrow) => {
      gsap.to(arrow, {
        x: 8,
        y: -8,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    };

    arrowAnimation(aurablissArrowRef.current);
    arrowAnimation(flickbiteArrowRef.current);
  }, []);

  // Hover enter/leave/follow (unchanged)
  const handleHoverEnter = (circleRef, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(circleRef.current, { x, y });
    gsap.to(circleRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.4,
      ease: "back.out(2.7)",
    });
  };

  const handleHoverLeave = (circleRef) => {
    gsap.to(circleRef.current, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  const handleHoverMove = (circleRef, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(circleRef.current, {
      x,
      y,
      duration: 0.2,
      ease: "power3.out",
    });
  };

  return (
    <div className="container">
      <div className="mt-5 ">
        <div className=" flex flex-col md:flex-row gap-[15px] mb-project">
          {/* Aurabliss */}
          <div
            ref={aurablissRef}
            className="relative w-full md:w-[600px] h-[350px] overflow-hidden group card"
            onMouseEnter={(e) => handleHoverEnter(aurablissCircleRef, e)}
            onMouseLeave={() => handleHoverLeave(aurablissCircleRef)}
            onMouseMove={(e) => handleHoverMove(aurablissCircleRef, e)}
          >
            <a
              ref={aurablissCircleRef}
              href="https://www.behance.net/gallery/206112431/Aurabliss"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute w-36 h-11 -translate-x-1/2 -translate-y-1/2 
                         rounded-full bg-[#3545D6] text-white font-medium text-[16px]
                         flex items-center justify-center pointer-events-auto z-20 gap-2 overflow-hidden"
              style={{ scale: 0, opacity: 0 }}
            >
              view work
              <svg
                ref={aurablissArrowRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className="text-white rotate-[-45deg]"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </a>

            <img
              src={AuraBliss}
              alt="Aurabliss Project"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* FlickBite */}
          <div
            ref={flickbiteRef}
            className="relative w-full md:w-[600px] h-[350px] overflow-hidden group card"
            onMouseEnter={(e) => handleHoverEnter(flickbiteCircleRef, e)}
            onMouseLeave={() => handleHoverLeave(flickbiteCircleRef)}
            onMouseMove={(e) => handleHoverMove(flickbiteCircleRef, e)}
          >
            <a
              ref={flickbiteCircleRef}
              href="https://www.behance.net/gallery/205180435/FlickBite-App-UX-Case-Study"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute w-36 h-11 -translate-x-1/2 -translate-y-1/2 
                         rounded-full bg-[#3545D6] text-white font-medium text-[16px]
                         flex items-center justify-center pointer-events-auto z-20 gap-2 overflow-hidden"
              style={{ scale: 0, opacity: 0 }}
            >
              view work
              <svg
                ref={flickbiteArrowRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className="text-white rotate-[-45deg]"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </a>

            <img
              src={flickbite}
              alt="FlickBite UX Case Study"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
