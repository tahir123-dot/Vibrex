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
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (!hasLoaded && location.pathname === "/") {
      setIsLoading(true);

      const timer = setTimeout(() => {
        gsap.to(loaderRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 2,
          ease: "power4.inOut",
          onComplete: () => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoaded", "true"); // mark as done
          },
        });
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed top-0 left-0 w-full h-full z-50 bg-black flex items-center justify-center"
        >
          <Loading />
        </div>
      )}

      {!isLoading && (
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
      )}
    </>
  );
};

export default AppRoutes;
