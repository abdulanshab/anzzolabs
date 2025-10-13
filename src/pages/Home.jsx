import React, { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import {
  About,
  Founder,
  Hero,
  Projects,
  Services,
  Showreel,
  WorkTrail,
  Preloader,
  ProjectsSecond,
} from "../components";
import "../components/responsive/Home.scss"

const Home = () => {
  const heroRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isSticky, setIsSticky] = useState(true);

  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Lenis ref
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1,
      easing: (t) => t * (2 - t), // linear easing
      smooth: true,
      direction: "vertical", // vertical scrolling
    });

    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  // Scroll effect for Hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOffset = Math.min(scrollY * 0.35, 100);
      setOffset(newOffset);
      setIsSticky(scrollY <= 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle fade-out completion
  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => setLoading(false), 500); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [fadeOut]);

  return (
    <div className="relative">
      {/* Hero */}
      <div
        ref={heroRef}
        className={`${isSticky ? "sticky top-[120px] z-10" : "relative z-10"}`}
        style={{
          transform: `translateY(-${offset}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <Hero />
      </div>

      {/* Showreel overlapping Hero */}
      <div className="relative z-20">
        <div className="absolute top-0 left-0 w-full">
          <Showreel />
        </div>
        <div className="h-[650px]"></div>
      </div>

      <About />
      <div className="container">
        <div className="flex justify-between mt-[150px] works">
          <p className="font-medium">[ recent projects ]</p>
          <a
            href="/works"
            className="font-medium relative overflow-hidden 
                   before:content-[''] before:absolute before:bottom-0 before:right-0 
                   before:w-0 before:h-[1.5px] before:bg-black 
                   before:transition-all before:duration-300 
                   hover:before:left-0 hover:before:w-full"
          >
            see all works
          </a>
        </div>

        <Projects />
        <WorkTrail />
        <ProjectsSecond />
        <Services />
        <Founder />
      </div>

      {/* Preloader overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 pointer-events-none ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Preloader onFinish={() => setFadeOut(true)} />
        </div>
      )}
    </div>
  );
};

export default Home;
