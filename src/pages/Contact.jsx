import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".contact-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".form-field").forEach((field) => {
        gsap.from(field, {
          scrollTrigger: {
            trigger: field,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("EmailJS Success:", result.text);
          alert("Message sent successfully! Our team will contact you soon.");
          formRef.current.reset();
          setSending(false);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Something went wrong. Please try again later.");
          setSending(false);
        }
      );
  };

  return (
    <div className="container" ref={sectionRef}>
      {/* First Section */}
      <div className="flex my-[100px] gap-[25px] contact-section">
        <div className="w-full">
          <p className="text-[50px] font-medium">GET IN TOUCH</p>
          <p className="text-[18px] uppercase opacity-50 pl-1">
            Fill in the details, and our team will get back to you
          </p>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="w-full">
          <label className="text-[18px] font-medium uppercase form-field">
            <span className="text-[#3545D6]">*</span> Your Name
          </label>
          <br />
          <input
            name="from_name"
            type="text"
            placeholder="Full name"
            className="py-[20px] border-b w-full border-[#00000035] outline-0 placeholder:opacity-35 form-field"
            required
          />
          <br />
          <br />

          <label className="text-[18px] font-medium uppercase form-field">
            <span className="text-[#3545D6]">*</span> Your Email
          </label>
          <br />
          <input
            name="from_email"
            type="email"
            placeholder="Email Address"
            className="py-[20px] border-b w-full border-[#00000035] outline-0 placeholder:opacity-35 form-field"
            required
          />
          <br />
          <br />

          <label className="text-[18px] font-medium uppercase form-field">
            <span className="text-[#3545D6]">*</span> Project Details
          </label>
          <br />
          <input
            name="project_details"
            type="text"
            placeholder="What is your project goal, requirement and specific timeline..."
            className="py-[20px] border-b w-full border-[#00000035] outline-0 placeholder:opacity-35 form-field"
            required
          />
          <br />
          <br />

          <label className="text-[18px] font-medium form-field">
            <span className="text-[#3545D6]">*</span> Project Budget
          </label>
          <br />
          <input
            name="budget"
            type="text"
            placeholder="What is your Budget (INR)"
            className="py-[20px] border-b w-full border-[#00000035] outline-0 placeholder:opacity-35 form-field"
            required
          />
          <br />

          <button
            type="submit"
            disabled={sending}
            className={`text-[#3545D6] cursor-pointer text-[18px] font-bold pt-[50px] form-field ${
              sending ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {sending ? "SENDING..." : "SUBMIT INQUIRY"}
          </button>
        </form>
      </div>

      {/* Second Section */}
      <div className="flex my-[200px] gap-[25px] contact-section">
        <div className="w-full">
          <p className="text-[50px] font-medium uppercase leading-15">
            call or email <br /> us directly
          </p>
          <p className="text-[18px] uppercase opacity-50 pl-1 pt-[18px] leading-5">
            reach out to our team for fast, <br />
            personalized assistance
          </p>
        </div>

        <div className="flex flex-col gap-[100px] w-full">
          <div>
            <p className="text-[20px] font-medium uppercase">Email support</p>
            <p className="text-[40px] font-medium t-[35px] uppercase pt-[35px]">
              anzzolabs@gmail.com
            </p>
            <a
              href="mailto:anzzolabs@gmail.com"
              className="text-[16px] font-bold uppercase flex items-center gap-2 text-[#3545D6] pt-[20px]"
            >
              SEND US EMAIL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                className="text-[#3545D6] rotate-[-45deg]"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </a>
          </div>

          <div>
            <p className="text-[20px] font-medium uppercase">phone support</p>
            <p className="text-[40px] font-medium t-[35px] uppercase pt-[35px]">
              +91 9895911863
            </p>
            <a
              href="tel:+919895911863"
              className="text-[16px] font-bold uppercase flex items-center gap-2 text-[#3545D6] pt-[20px]"
            >
              CALL US NOW
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                className="text-[#3545D6] rotate-[-45deg]"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
