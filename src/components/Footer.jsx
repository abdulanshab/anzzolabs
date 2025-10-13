import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./responsive/Footer.scss";

const Footer = () => {
  const socialLinksRef = useRef([]);

  useEffect(() => {
    const links = socialLinksRef.current;

    // Apply GSAP hover animation only to social links
    links.forEach((el) => {
      if (!el) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(el, {
        x: 10,
        duration: 0.4,
        ease: "power3.out",
      });

      const handleEnter = () => tl.play();
      const handleLeave = () => tl.reverse();

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);

      // Cleanup on unmount
      return () => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="mt-[100px] mb-10 w-full flex flex-col footer-section">
        {/* Top Section */}
        <div className="flex py-25 border-b border-[#D9D9D9] w-full footer-item">
          <div>
            <h1 className="text-[48px] leading-2 pb-6">
              Stay Connected<span>®</span>
            </h1>
            <Link
              className="underline text-[36px] font-medium"
              to="mailto:hello@anzzolabs.com"
            >
              hello@anzzolabs.com
            </Link>
            <p className="pt-6 opacity-50 text-[16px] leading-5">
              Crafted with creativity and passion. Let’s stay connected <br />
              reach out anytime!
            </p>
          </div>

          {/* Social Links (Animated) */}
          {/* Social Links (Animated) */}
          <div className="flex flex-col pl-[250px] gap-3 font-medium social-links">
            {[
              { name: "Instagram", url: "https://www.instagram.com/anzzolabs" },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/company/anzzolabs",
              },
              {
                name: "Facebook",
                url: "https://www.facebook.com/profile.php?id=61577447743529",
              },
              { name: "Behance", url: "https://www.behance.net/anzzolabs" },
              { name: "Dribbble", url: "https://dribbble.com/anzzolabs" },
            ].map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => (socialLinksRef.current[index] = el)}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                {`0${index + 1}/ ${platform.name}`}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex justify-center items-center w-full border-b border-[#D9D9D9] py-8">
          <h1 className="text-[120px] footer-logo">
            ANZZOLABS<span>®</span>
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center w-full pt-5 font-medium text-[16px] footer-copywrite">
          <p>Copywrite © Anzzolabs 2025</p>
          <p className="cursor-pointer" onClick={scrollToHero}>
            Back to top
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
