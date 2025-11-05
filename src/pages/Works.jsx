import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { AuraBliss, flickbite, Img1, Img2, Img3, Img4, Img5 } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const imageRefs = useRef([]);
  const wrapperRef = useRef(null);
  const projectRefs = useRef([]);
  const circleRefs = useRef([]);
  const arrowRefs = useRef([]);
  const textRef = useRef(null); // 👈 for heading animation

  // ✅ LENIS Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // ✅ Mouse trail effect
  useEffect(() => {
    gsap.set(imageRefs.current, { autoAlpha: 0 });
    const wrapper = wrapperRef.current;
    let autoHideTimeout;

    const moveHandler = (e) => {
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

    return () => wrapper.removeEventListener("mousemove", moveHandler);
  }, []);

  // ✅ Scroll-triggered animations (projects + arrows + heading cutout)
  useEffect(() => {
    // Animate project cards
    projectRefs.current.forEach((card) => {
      if (!card) return;
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
    });

    // Floating arrow motion
    arrowRefs.current.forEach((arrow) => {
      if (!arrow) return;
      gsap.to(arrow, {
        x: 8,
        y: -8,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // ✅ Heading cutout animation (like WorkTrail)
    const heading = textRef.current;
    if (heading) {
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
          duration: 1.5,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play",
          },
        });
      });
    }
  }, []);

  // ✅ Hover animations
  const handleHoverEnter = (circleRef, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(circleRef, { x, y });
    gsap.to(circleRef, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.4,
      ease: "back.out(2.7)",
    });
  };

  const handleHoverLeave = (circleRef) => {
    gsap.to(circleRef, {
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

    gsap.to(circleRef, {
      x,
      y,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const projects = [
    {
      id: 1,
      image: AuraBliss,
      link: "https://www.behance.net/gallery/206112431/Aurabliss",
      title: "Aurabliss",
      category: "Branding",
    },
    {
      id: 2,
      image: flickbite,
      link: "https://www.behance.net/gallery/205180435/FlickBite-App-UX-Case-Study",
      title: "FlickBite",
      category: "UI/UX",
    },
    {
      id: 3,
      image: Img1,
      link: "#",
      title: "Project Three",
    },
    {
      id: 4,
      image: Img2,
      link: "#",
      title: "Project Four",
    },
  ];

  const images = [Img1, Img2, Img3, Img4, Img5];

  return (
    <>
      {/* Mouse Trail + Text Cutout Section */}
      <div
        ref={wrapperRef}
        className="py-[60px] 
             sm:py-[80px] 
             md:py-[100px] 
             lg:py-[125px] relative"
      >
        {images.map((img, i) => (
          <img
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            src={img}
            alt={`trail-${i}`}
            className="pointer-events-none fixed top-0 left-0 w-[210px] h-[140px] object-cover"
            style={{
              zIndex: 999 - i,
              transform: "translate(-50%, -50%)",
              opacity: 0,
            }}
          />
        ))}

        {/* Cutout Animated Heading */}
        <p
          ref={textRef}
          className="font-medium 
             text-[36px] leading-[1.1] text-center uppercase overflow-hidden
             sm:text-[48px] 
             md:text-[64px] 
             lg:text-[80px] 
             xl:text-[90px]"
        >
          Crafting brands <br /> that speak, move, <br /> and endure.
        </p>

        {/* Inline style for cutout effect */}
        <style>{`
          .cutout-line {
            overflow: hidden;
            display: block;
          }
        `}</style>
      </div>

      {/* Project Cards */}
      <div className="container">
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-project">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="relative w-full h-[350px] overflow-hidden group card cursor-pointer"
              onMouseEnter={(e) =>
                handleHoverEnter(circleRefs.current[index], e)
              }
              onMouseLeave={() => handleHoverLeave(circleRefs.current[index])}
              onMouseMove={(e) => handleHoverMove(circleRefs.current[index], e)}
            >
              {/* Image Header */}
              <div className="flex justify-between py-2">
                <p className="text-[16px] font-medium">{proj.title}</p>
                <p className="text-[16px] font-medium">{proj.category}</p>
              </div>

              {/* Project Image */}
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95 pointer-events-none"
              />

              {/* Hover Button Behind Cursor */}
              <a
                ref={(el) => (circleRefs.current[index] = el)}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-36 h-11 -translate-x-1/2 -translate-y-1/2 
                           rounded-full bg-[#3545D6] text-white font-medium text-[16px]
                           flex items-center justify-center z-20 gap-2 overflow-hidden pointer-events-auto"
                style={{
                  scale: 0,
                  opacity: 0,
                  left: "0%",
                  top: "0%",
                }}
              >
                view work
                <svg
                  ref={(el) => (arrowRefs.current[index] = el)}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Works;
