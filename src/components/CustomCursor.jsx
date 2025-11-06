import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ✅ Global controls for showing/hiding the cursor
export const cursorControls = {
  hide: () => {},
  show: () => {},
};

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

    // ✅ Use a single GSAP ticker for buttery smooth movement
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const speed = 0.15; // lower = more lag/smooth follow

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;

      gsap.set(cursor, { x: posX, y: posY });
    };

    gsap.ticker.add(render);
    document.addEventListener("mousemove", moveCursor);

    // ✅ Assign global control functions
    cursorControls.hide = () =>
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3, ease: "power3.out" });
    cursorControls.show = () =>
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        w-4 h-4
        bg-white
        mix-blend-difference
        rounded-full
        pointer-events-none
        z-[9999]
        hidden md:block
      "
    />
  );
};

export default CustomCursor;
