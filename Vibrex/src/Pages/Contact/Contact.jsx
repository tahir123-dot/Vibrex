import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import contact from "../../assets/contact.jpg";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef();
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true); // Button disable

    emailjs
      .sendForm(
        "service_s4xyndo",
        "template_1tqctck",
        form.current,
        "RLfKPkAYNsfll-w_8"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully!"); // Success alert
          window.open("https://calendly.com/tahirrashid736333/30min", "_blank");
          form.current.reset(); // Optional: form clear
          setSending(false);
        },
        (error) => {
          console.log(error.text);
          alert("Something went wrong. Please try again.");
          setSending(false);
        }
      );
  };

  return (
    <div className="bg-[#000000] text-gray-200">
      <section
        className="relative flex flex-col items-start justify-center 
             px-6 md:px-16 lg:px-24 h-screen max-h-[900px] overflow-hidden 
             bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contact})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10">
          {/* HEADING */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
            Let’s Build Something <br /> Amazing Together
          </h1>

          {/* DESCRIPTION */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Have a project in mind? Whether it’s AI solutions, enterprise
            automation, or something unique — we’ll get back to you within 24
            hours. Our team believes in building smart, scalable systems that
            grow with your business.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-6">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-white tracking-tight">
            Contact Information
          </h2>

          {/* Islamabad */}
          <div className="flex items-start gap-5 p-5 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition duration-300 shadow-sm hover:shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 text-white">
              <MapPin size={26} />
            </div>
            <div className="text-gray-200">
              <h3 className="font-semibold text-xl mb-1 text-white">
                Islamabad
              </h3>
              <p className="text-gray-300 text-sm">Royal Town, 88/KA, Royal</p>
              <p className="flex items-center gap-2 mt-3 text-gray-100 hover:text-white transition">
                <Mail size={18} /> hello@vibrex.agency
              </p>
              <p className="flex items-center gap-2 text-gray-100 hover:text-white transition">
                <Phone size={18} /> +92 341 5150339
              </p>
            </div>
          </div>

          {/* USA */}
          <div className="flex items-start gap-5 p-5 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition duration-300 shadow-sm hover:shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 text-white">
              <MapPin size={26} />
            </div>
            <div className="text-gray-200">
              <h3 className="font-semibold text-xl mb-1 text-white">USA</h3>
              <p className="text-gray-300 text-sm">
                75 E 3rd St Sheridan, WY 82801
              </p>
              <p className="flex items-center gap-2 mt-3 text-gray-100 hover:text-white transition">
                <Mail size={18} /> hello@vibrex.agency
              </p>
              <p className="flex items-center gap-2 text-gray-100 hover:text-white transition">
                <Phone size={18} /> +1 470 504 3155
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-3xl font-extrabold mb-8 text-white tracking-tight">
            Schedule a Call
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                className="w-full rounded-lg p-3  bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                className="w-full rounded-lg p-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">
                Project Budget
              </label>
              <select
                name="project_budget"
                className="w-full rounded-lg p-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option className="text-black">Less than $1000</option>
                <option className="text-black">$1000 - $5000</option>
                <option className="text-black">$5000 - $20,000</option>
                <option className="text-black">Above $20,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">
                How did you hear about us?
              </label>
              <input
                type="text"
                name="referral"
                className="w-full rounded-lg p-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Referral, Social Media, etc."
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">
                Tell us about your project
              </label>
              <textarea
                name="project_details"
                rows="4"
                className="w-full rounded-lg p-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                placeholder="Share your product goals..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                sending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:from-blue-500 hover:bg-blue-300 shadow-lg hover:shadow-xl"
              }`}
            >
              {sending ? "Sending..." : "Book a Call"}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
