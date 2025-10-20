import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import web from "../../assets/web.png";
import uiux from "../../assets/uiux.png";
import ai from "../../assets/ai.png";
import team from "../../assets/team.png";
import security from "../../assets/security.png";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web & App Development",
    image: web,
    text: [
      "We craft scalable, high-performance web and mobile applications tailored for business growth.",
      "Our focus is clean architecture, intuitive UX, and reliable performance.",
    ],
  },
  {
    title: "UI/UX Creative Design",
    image: uiux,
    text: [
      "We design interfaces that feel natural and look stunning.",
      "Minimal, functional, and emotionally engaging — every pixel counts.",
    ],
  },
  {
    title: "AI-Powered Solutions",
    image: ai,
    text: [
      "Integrate AI into your workflow — automation, chatbots, and analytics that evolve with your users.",
      "Smart, data-driven innovation to keep you ahead.",
    ],
  },
  {
    title: "Dedicated Development Team",
    image: team,
    text: [
      "Scale your vision with our dedicated experts who align with your mission.",
      "Seamless collaboration, transparent communication, and quality code.",
    ],
  },
  {
    title: "Performance & Security",
    image: security,
    text: [
      "We secure and optimize your digital presence.",
      "Fast, stable, and future-ready — always.",
    ],
  },
];

const StackedCard = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      const image = section.querySelector("img");
      const textBlocks = section.querySelectorAll("h1, p");

      // Text animation
      gsap.fromTo(
        textBlocks,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        image,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const Section = ({ title, text, image, reverse }) => (
    <section
      ref={addToRefs}
      className={`min-h-screen flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-center gap-16 px-6 md:px-20 bg-white `}
    >
      {/* Text content */}
      <div className="max-w-2xl flex flex-col gap-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight">
          {title}
        </h1>
        {text.map((t, i) => (
          <p key={i} className="text-gray-700 leading-relaxed text-lg">
            {t}
          </p>
        ))}
      </div>

      {/* Image section */}
      <div className="relative h-96 w-96 flex-shrink-0 z-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain opacity-90 transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );

  return (
    <div className="text-black font-inter overflow-hidden bg-white">
      {services.map((s, i) => (
        <Section
          key={i}
          title={s.title}
          image={s.image}
          text={s.text}
          reverse={i % 2 === 1}
        />
      ))}
    </div>
  );
};

export default StackedCard;
