import React from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import aboutImg from "../../assets/about.jpg";
import "./About.css";
import ImpactNumer from "../../Component/ImpactNumber/ImpactNumer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const About = () => {
  // Typewriter hook
  const [text] = useTypewriter({
    words: [
      "Designing tomorrow’s intelligence, today. From startups to enterprises.Crafting AI-powered digital products.",
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  return (
    <section className="relative bg-[#f7f7f7] text-gray-800 py-20 px-6">
      {/* Hero Section */}
      <div>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-8xl font-bold text-gray-900"
        >
          We are <span className="text-indigo-600">NeuroForge</span>
        </motion.h2>

        {/* Typewriter effect */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-3xl italic text-gray-600 leading-relaxed h-[100px]"
        >
          {text}
        </motion.p>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-4"
      >
        <img src={aboutImg} alt="team" className="rounded-2xl shadow-lg" />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full py-20 mt-10"
      >
        <h1 className="text-5xl font-bold text-black leading-17">
          Innovative design, future-proof solutions. We deliver impact,{" "}
          <span className="font-bold text-[#29242469]">not just visuals</span>
        </h1>
      </motion.div>

      {/* Impact Numbers */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ImpactNumer />
      </motion.div>

      {/* Our Story */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-20 flex flex-col lg:flex-row justify-between items-start gap-10 bg-indigo-600 rounded-2xl p-8 md:p-16 text-white"
      >
        <h3 className="text-4xl sm:text-5xl lg:text-6xl w-full lg:w-1/3 font-light text-start">
          Our Story
        </h3>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans leading-relaxed max-w-full lg:max-w-4xl text-justify">
          NeuroForge started in a small room with one vision: to merge design
          with intelligence. We saw startups struggling with poor UX and
          enterprises wasting time on clunky systems. So we decided to fix it —
          one product at a time. Today, NeuroForge partners with founders,
          product teams, and enterprises to craft digital experiences that scale
          globally.
        </p>
      </motion.div>

      {/* Founders Journey */}
      <section className="px-6 mt-2 md:px-16 lg:px-32 py-12 bg-black text-amber-50 flex flex-col lg:flex-row gap-12 lg:gap-20 rounded-2xl">
        {/* Left Side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col justify-start gap-2 lg:gap-4 w-full lg:w-1/3"
        >
          <h1 className="text-6xl md:text-2xl lg:text-6xl font-extrabold leading-tight">
            Founders
          </h1>
          <span className="text-6xl md:text-2xl lg:text-4xl font-extrabold leading-tight">
            Journey
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold">
            Tahir{" "}
          </h1>
          <span className="text-6xl md:text-7xl lg:text-4xl font-extrabold leading-tight">
            Rashid
          </span>
          <p className="text-gray-200 text-lg md:text-xl mt-4">
            2024, When NeuroForge Began
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6 w-full lg:w-2/3 text-justify"
        >
          <p className="text-gray-200 text-lg md:text-xl">
            Back in late 2024, I started NeuroForge from a small room in
            Islamabad while pursuing my bachelor’s in Software Engineering. The
            vision was simple: solve real-world problems and make digital
            experiences seamless for everyone.
          </p>
          <p className="text-gray-200 text-lg md:text-xl">
            What began as a personal drive to create solutions quickly grew into
            a mission to build a company that could help startups, enterprises,
            and innovators transform their ideas into impactful products.
          </p>
          <p className="text-white font-semibold text-lg md:text-xl">
            “We don’t just create software – we build a future where
            possibilities are limitless.”
          </p>
          <p className="text-gray-200 text-lg md:text-xl">
            Today, NeuroForge is on a journey to become a globally recognized
            software company. From humble beginnings to ambitious projects
            ahead, every step is guided by the vision to make NeuroForge not
            just a company, but a catalyst for innovation worldwide.
          </p>
        </motion.div>
      </section>
    </section>
  );
};

export default About;
