import React from "react";
import {
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  "https://www.youtube.com/channel/UCozjVsfgHcxd3FeTXevFRFg",
  "https://x.com/vibrex_tech",
  "https://www.tiktok.com/@vibrextech",
  "https://instagram.com/tahir_.3925",
  "https://www.linkedin.com/company/vibrextech/",
];

const Footer = () => {
  const icons = [FaYoutube, FaTwitter, FaTiktok, FaInstagram, FaLinkedin];

  return (
    <>
      {/*<div className="h-screen bg-amber-400"></div>*/}
      <footer className="bg-[#ffffff] text-black pt-10 px-6 md:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full h-10 w-16 flex items-center justify-center text-2xl font-bold text-white">
                V
              </div>
              <h1 className="text-xl font-semibold">Vibrex</h1>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-6">
              Innovative AI & software solutions to help businesses grow
              smarter, faster and more secure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-black">
              Quick Links
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-400 cursor-pointer"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 cursor-pointer"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-blue-400 cursor-pointer"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <Link to="/services">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Services
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-blue-400 cursor-pointer">
                  AI Solutions
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  Web Development
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  App Development
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  UI/UX Design
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  Cloud Security
                </li>
              </ul>
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-black">Contact</h2>
            <p className="text-sm">Islamabad , Pakistan</p>
            <p className="text-sm">+92 341 5150339</p>
            <a
              href="mailto:hello@vibrex.tech"
              className="text-black flex text-sm items-center gap-2 hover:underline"
            >
              <FaEnvelope />
              hello@vibrex.tech
            </a>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {icons.map((Icon, index) => (
                <a
                  key={index}
                  href={socialLinks[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-400 bg-gray-900 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  <Icon className="text-gray-100 hover:text-white text-lg transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 py-4">
          <p>@ {new Date().getFullYear()} Vibrex. All Rights Reserved.</p>
          <p className="hover:text-blue-400">
            Privacy Policy | Terms & Conditions
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
