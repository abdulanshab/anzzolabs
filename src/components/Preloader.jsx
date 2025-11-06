import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// Assuming Img1, Img2, etc., are correctly resolving paths
import { Img1, Img2, Img3, Img4, Img5 } from "../assets";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  // Ref for the progress number
  const progressNumRef = useRef(null);
  const imageRefs = useRef([]);
  const images = [Img1, Img2, Img3, Img4, Img5];

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Guard: ensure critical refs exist
    if (!textRef.current || !containerRef.current) return;

    // Animate center text (Anzzolabs)
    gsap.fromTo(
      textRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animate images (Looping timeline)
    const imageTimeline = gsap.timeline({ repeat: -1 });
    images.forEach((_, i) => {
      // Use a strict check for the individual image ref before adding to the timeline
      if (imageRefs.current[i]) {
        imageTimeline.to(imageRefs.current[i], { opacity: 1, duration: 0.2 });
        imageTimeline.to(imageRefs.current[i], {
          opacity: 1,
          duration: 0.2,
          delay: 0.2, // Hold duration
        });
      }
    });

    // Progress and exit animation timeline
    const progressTimeline = gsap.timeline();
    progressTimeline.to(
      { value: 0 },
      {
        value: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate() {
          setProgress(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          // Stop image loop safely
          imageTimeline.kill();

          // 1. Animate text out
          if (textRef.current)
            gsap.to(textRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
            });

          // 2. Animate images out (STRENGTHENED CHECK)
          // Ensure the ref array exists AND has elements before animating
          if (imageRefs.current && imageRefs.current.length > 0)
            gsap.to(imageRefs.current.filter(Boolean), {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
              stagger: 0.1,
            });

          // 3. Animate progress number out (Using ref, checking for null)
          if (progressNumRef.current) {
            gsap.to(progressNumRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
            });
          }

          // 4. Animate container out (The final step)
          if (containerRef.current)
            gsap.to(containerRef.current, {
              y: "-100%",
              opacity: 1, // Note: You probably want opacity: 0 here if you want it to fade too
              duration: 1,
              ease: "power2.in",
              delay: 0.2,
              onComplete: () => {
                // The callback that triggers component unmount
                if (onFinish) onFinish();
              },
            });
        },
      }
    );

    // Cleanup to kill timelines when component unmounts unexpectedly
    return () => {
      progressTimeline.kill();
      imageTimeline.kill();
    };
    // Re-run effect only if these dependencies change
  }, [onFinish, images.length]);

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
              // Set the ref for each image element
              ref={(el) => (imageRefs.current[index] = el)}
              src={img}
              alt={`preloader-${index}`}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0"
            />
          ))}
        </div>

        {/* Attach the progress number ref */}
        <div
          ref={progressNumRef}
          className="mt-2 text-[18px] font-medium progress-number"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
