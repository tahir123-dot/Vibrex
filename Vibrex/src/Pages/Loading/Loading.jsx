import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Loading.css";

const Loading = () => {
  const textRef = useRef(null);

  useEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { scale: 0.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power1.out" }
    );
  }, []);

  return (
    <div
      ref={textRef}
      className="bg-white border border-amber-50 text-black h-screen w-screen flex items-center justify-center flex-col gap-6 sm:gap-8 md:gap-10"
    >
      <h1
        className="
          font-bold font-noto tracking-widest outline-text
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
        "
      >
        Vibrex
      </h1>
    </div>
  );
};

export default Loading;
