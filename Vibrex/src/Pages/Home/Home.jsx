import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Home.css";
import { FaPlay, FaTimes } from "react-icons/fa";
import myVideo from "../../assets/NeuroFroge.mp4";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackedCard from "../../Component/StackedCard/StackedCard";
import Testimonials from "../../Component/Testimonials/Testimonials";
import { FaArrowRight } from "react-icons/fa";
import ImpactNumer from "../../Component/ImpactNumber/ImpactNumer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const headingRef = useRef();
  const paraRef = useRef();
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // <-- MOVE categories HERE so JSX can access it
  const categories = [
    {
      title: "For Startups",
      desc: "We assist early-stage teams in turning their ideas into MVPs more quickly. Get actual user input, win over investors, and release your app stress-free.",
      points: [
        "Launch MVPs fast",
        "Validate with users",
        "Build investor decks",
      ],
    },
    {
      title: "For Product Teams",
      desc: "We become a part of your internal process, handling the main tasks for you. Rely on us for UX support, design systems, and an easy transition of your project.",
      points: ["Full-cycle UX/UI", "Design systems", "Cross-platform support"],
    },
    {
      title: "For Founders",
      desc: "Design that helps you reach your targets. We care about how things work and how they help, using hard information, not guesswork.",
      points: [
        "Growth-focused UX",
        "Landing page design",
        "A/B testing assets",
      ],
    },
  ];

  useEffect(() => {
    const t2 = gsap.timeline();

    // safety: check headingRef exists before querySelectorAll
    const word = headingRef.current?.querySelectorAll("span") ?? [];

    t2.fromTo(
      word,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.2,
      }
    );

    t2.fromTo(
      paraRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
    });

    gsap.fromTo(
      "#section2 #heading",
      { opacity: 0, x: -500 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#section2 #heading",
          scroller: "body",
          start: "top 40%",
          end: "top 20%",
          scrub: 5,
        },
      }
    );

    gsap.fromTo(
      "#section2 #para",
      { opacity: 0, x: 300 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#section2 #heading",
          scroller: "body",
          start: "top 40%",
          end: "top 20%",
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <>
      <div
        className="relative h-screen flex flex-col items-center justify-center text-black gap-10 px-14 md:flex-row md:gap-16 lg:gap-24 overflow-hidden"
        id="hero"
      >
        {/* Background Video */}

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-center md:text-left text-white"
        >
          {`Powering the Future with AI – Smarter Solutions for Every Business`
            .split(" ")
            .map((word, i) => (
              <span key={i} className="inline-block">
                {word}&nbsp;
              </span>
            ))}
        </h1>

        {/* Paragraph + Button */}
        <div
          ref={paraRef}
          className="flex flex-col items-center md:items-start gap-6 md:gap-10 max-w-xl opacity-0"
        >
          <p className="text-lg text-gray-300 text-center md:text-left leading-relaxed">
            From AI agents to enterprise automation, we design solutions that
            think, learn, and scale with your business
          </p>

          <div className="flex flex-row items-center gap-6">
            <Link to="/contact">
              {" "}
              <button className="px-6 py-3 bg-gray-100 text-black cursor-pointer rounded-2xl font-medium hover:bg-gray-700 hover:text-white transition">
                Contact us
              </button>
            </Link>

            {/* Play Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-black text-black bg-gray-200 hover:bg-gray-400 hover:text-black cursor-pointer transition"
            >
              <FaPlay />
            </button>
          </div>
        </div>

        {/* Fullscreen Video Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            {/* Close Icon */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
              }}
              className="absolute top-6 right-6 text-white text-3xl hover:text-red-500 transition z-[9999]"
            >
              <FaTimes />
            </button>

            <video
              ref={videoRef}
              src={myVideo}
              autoPlay
              playsInline
              className="w-full max-w-4xl rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>

   
      <div
        className="h-screen bg-[#1c1c1c] overflow-hidden relative"
        id="section2"
      >
        {/* Shimmer Overlay */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent animate-[shimmer_3s_infinite]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black, transparent)",
          }}
        ></span>

        <div className="flex flex-col items-center justify-center h-full px-6 md:px-20 text-white relative z-10">
          {/* Heading */}
          <h1
            id="heading"
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-center 
         text-white
        drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            Who We Are
          </h1>

          {/* Paragraph */}
          <p
            id="para"
            className="max-w-5xl text-center mt-8 text-lg md:text-2xl lg:text-3xl 
       font-light leading-relaxed md:leading-snug px-2 md:px-10 text-gray-200"
          >
            At <span className="font-semibold text-blue-200">NeuroForge</span>,
            we’re more than just developers — we’re problem solvers, engineers,
            and designers on a mission to transform businesses with AI. From
            automation to product design, we deliver scalable, future-ready
            solutions built to make an impact.
          </p>

          {/* Decorative line */}
          <div className="mt-10 w-60 h-1 bg-gradient-to-r from-blue-600 via-white/70 to-blue-600 rounded-full"></div>
        </div>

        <style>
          {`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}
        </style>
      </div>

      <div>
        <StackedCard />
      </div>

      <div className="bg-white text-4xl text-amber-50">
        <Testimonials />
      </div>

      <div className="relative bg-[#ffffff] text-[#000] px-6 md:px-12 lg:px-18 py-10 overflow-hidden">
        {/* Shimmer Overlay */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent animate-[shimmer_3s_infinite]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black, transparent)",
          }}
        ></span>

        <div className="relative z-10">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-[70px] tracking-tighter text-start w-full leading-tight  drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            DIGITAL SOLUTIONS
            <br />
            <span className=" font-light text-2xl md:text-3xl lg:text-[30px] drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              THAT DRIVE IMPACT
            </span>
          </h1>

          <h2 className="text-base md:text-lg lg:text-[20px] font-bold text-[#979797] leading-relaxed max-w-3xl">
            At NeuroForge, we don’t just code. We design experiences, automate
            workflows, and deliver results that matter. Every project begins
            with understanding your challenges — and ends with a product that’s
            efficient, scalable, and built for the future.
          </h2>
        </div>

        <style>
          {`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}
        </style>
      </div>

      <section
        className="py-20 px-6 md:px-12 lg:px-20 bg-white"
        id="who-we-design-for"
      >
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who We Design For & How We Support Them
          </h2>
          <p className="text-gray-600 text-lg">
            We work with startups, product teams, and founders — helping them
            launch faster, scale smarter, and design with impact.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-[#f9f9f9] rounded-2xl p-8 shadow-md hover:shadow-xl transition border-t-4 border-blue-500"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{cat.desc}</p>

              {/* Points */}
              <ul className="space-y-3">
                {cat.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <FaArrowRight className="text-blue-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="bg-[#ffffff] text-[#232323] px-6 md:px-12 lg:px-18 py-10">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-[70px] tracking-tighter text-start w-full leading-tight mb-6">
          INTELLIGENT SOFTWARE,
          <span className="block md:inline text-3xl md:text-5xl lg:text-[70px] font-bold">
            {" "}
            POWERED BY VISION.
          </span>
        </h1>

        <h2 className="text-base md:text-lg lg:text-[20px] font-bold text-[#979797] leading-relaxed max-w-3xl">
          NeuroForge transforms complex business processes into intuitive,
          AI-driven solutions. From startups to enterprises, we build software
          that thinks, learns, and scales with your goals. Born in Islamabad, we
          started small with a bold idea – simplify the digital world. Today,
          our solutions empower businesses to achieve more with smarter
          workflows, better insights, and faster outcomes.
        </h2>

        <b className="block mt-4 text-sm md:text-base lg:text-lg">
          Partnered with innovators, trusted by growing enterprises, and built
          for tomorrow.
        </b>
      </div>

      <div className="px-6 pb-3 bg-[#e9e8e8]">
        <ImpactNumer />
      </div>

      <section className="text-center py-20 bg-[#e9e8e8] text-gray-900">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Build the Future Together
        </h2>
        <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
          Every great product starts with a bold idea. Whether you’re a startup
          or an enterprise, we’re here to design smarter solutions that grow
          with your business.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Link to="/contact">Start Your Project</Link>
        </motion.a>
      </section>
    </>
  );
};

export default Home;
