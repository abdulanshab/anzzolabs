import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // ✅ Hide on small screens
    if (window.innerWidth < 768) {
      if (cursor) cursor.style.display = "none";
      return;
    }

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5, // Smoothness
        ease: "power4.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] hidden md:block"
    />
  );
};

export default CustomCursor;
