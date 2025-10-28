import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Loading from "../../Pages/Loading/Loading";
import Home from "../../Pages/Home/Home";
import Navbar from "../Navbar/Navbar";
import Services from "../../Pages/Service/Services";
import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import Hackathone from "../../Pages/Hackathone/Hackathone";
import Footer from "../Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import ShowCase from "../../Pages/ProductShowcase/ShowCase";
import Login from "../../Pages/Admin/Login/Login";
import Add from "../../Pages/Admin/AddProjects/Add";
import ProtectedRoute from "../ProtectedRoute";

const AppRoutes = () => {
  const [isReady, setIsReady] = useState(false);
  const loaderRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    // 🚀 If first visit and on home route, show loader
    if (!hasLoaded && location.pathname === "/") {
      document.body.style.overflow = "hidden"; // Disable scroll while loading

      const timeline = gsap.timeline({
        onComplete: () => {
          // After animation ends, hide loader and show site
          setIsReady(true);
          document.body.style.overflow = "auto";
          sessionStorage.setItem("hasLoaded", "true");
        },
      });

      timeline.fromTo(
        loaderRef.current,
        { y: 0, opacity: 1 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );

      timeline.to(loaderRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 1.2,
        ease: "power4.inOut",
      });
    } else {
      // 🚫 Already loaded once → skip loader
      setIsReady(true);
    }
  }, [location.pathname]);

  // ⏳ While not ready → show loader only
  if (!isReady) {
    return (
      <div
        ref={loaderRef}
        className="fixed top-0 left-0 w-full h-full z-[9999] bg-black flex items-center justify-center overflow-hidden"
      >
        <Loading />
      </div>
    );
  }

  // ✅ Once ready → render the rest of the app
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/codeBreakers" element={<Hackathone />} />
        <Route path="/gallery" element={<ShowCase />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/addProject"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
