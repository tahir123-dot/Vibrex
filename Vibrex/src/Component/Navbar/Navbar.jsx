import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [openMenu, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // 👈 Scroll bar hide
  };

  const toggleClose = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          setIsOpen(false);
          document.body.style.overflow = "auto"; // 👈 Scroll bar wapas
        },
      });
    }
  };

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
  }, []);

  useEffect(() => {
    if (openMenu && menuRef.current) {
      const items = menuRef.current.querySelectorAll("li");

      gsap.fromTo(
        menuRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      );

      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.2,
          ease: "power4.out",
        }
      );
    }
  }, [openMenu]);

  return (
    <>
      {/* Navbar */}
      <header
        ref={headerRef}
        className=" w-full z-50 backdrop-blur-lg bg-black/50 text-white px-6 sm:px-16 py-4 border-b border-white/10"
      >
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-gray-200 to-white text-black rounded-full h-11 w-16 flex items-center justify-center text-2xl font-bold shadow-lg shadow-white/10">
                V
              </div>
              <div className="text-xl font-semibold tracking-wide">Vibrex</div>
            </div>
          </Link>

          {/* Buttons */}
          <div className="flex items-center gap-4 text-base font-light">
            <div
              onClick={() =>
                window.open("https://wa.me/923415150339", "_blank")
              }
              className="bg-white text-black py-2 px-5 rounded-full cursor-pointer hover:bg-gray-200 transition font-medium shadow-md"
            >
              Let's Talk
            </div>

            <div
              className="border border-white py-2 px-5 rounded-full cursor-pointer hover:bg-white hover:text-black transition font-medium"
              onClick={toggleOpen}
            >
              Menu
            </div>
          </div>
        </nav>
      </header>

      {/* Glass Sidebar Menu */}
      {openMenu && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 h-screen w-80 sm:w-96 
          backdrop-blur-2xl bg-white/10 border-r border-white/20 
          z-50 flex flex-col items-start pt-24 px-10 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={toggleClose}
            className="absolute top-6 right-6 bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition"
          >
            <FaTimes size={22} />
          </button>

          {/* Menu Items */}
          <ul className="space-y-8 text-left text-3xl font-light text-white">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "About Us", path: "/about" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact Us", path: "/contact" },
              { name: "CodeBreakers", path: "/codeBreakers" },
            ].map((item, i) => (
              <li
                key={i}
                className="relative cursor-pointer group font-medium tracking-wide"
              >
                <Link to={item.path}>
                  <span
                    className="relative inline-block px-2 py-1 rounded-md transition
                    after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500
                    group-hover:after:w-full group-hover:text-gray-200"
                    onClick={toggleClose}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto mb-10 text-sm text-gray-300 tracking-widest uppercase">
            Crafted with ❤️ by Vibrex
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
