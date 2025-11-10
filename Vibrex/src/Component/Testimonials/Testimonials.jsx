import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testpic1 from "../../assets/emily.jpg";
import testpic2 from "../../assets/yuki.jpg";
import testpic3 from "../../assets/evyn.jpg";
import testpic4 from "../../assets/sophi.jpg";
import testpic5 from "../../assets/savion.jpg";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Emily Carter",
    country: "USA",
    role: "Founder, SwiftMart",
    text: "Vibrex built our entire e-commerce platform with MERN stack. The site is fast, scalable, and super user-friendly. Customers love the smooth checkout process!",
    service: "Web & App Development",
    img: testpic1,
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    role: "CTO, ZenTech",
    text: "Their UI/UX design team transformed our ideas into stunning interactive prototypes. The final product looked exactly like the Figma designs – pixel perfect.",
    service: "UI/UX Creative Design",
    img: testpic2,
  },
  {
    name: "Ivan Petrov",
    country: "Russia",
    role: "CEO, SmartBotics",
    text: "We integrated their AI chatbot solution for customer support. It reduced our response time by 70% and improved customer satisfaction dramatically.",
    service: "AI Solutions",
    img: testpic3,
  },
  {
    name: "Sophie Müller",
    country: "Germany",
    role: "Product Manager, NovaHealth",
    text: "With their dedicated development team, we scaled our app within weeks. Communication was seamless and the developers felt like part of our in-house staff.",
    service: "Dedicated Development Team",
    img: testpic4,
  },
  {
    name: "Lucas Rossi",
    country: "Brazil",
    role: "COO, Finexa",
    text: "Their security audit saved us from major vulnerabilities. The team’s proactive monitoring gives us peace of mind while we focus on growth.",
    service: "Performance & Security",
    img: testpic5,
  },
];

const Testimonials = () => {
  useEffect(() => {
    gsap.fromTo(
      ".testimonial-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="bg-gradient-to-b from-white via-[#dcdcdc] to-white py-24 px-6 md:px-20 text-black font-inter">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          Trusted by Industry Leaders
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-3 max-w-2xl mx-auto">
          Discover how our partners worldwide achieve next-level growth with
          Vibrex.
        </p>
      </div>

      {/* Grid of Testimonials */}
      <div className="testimonial-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500"
          >
            <p className="text-gray-700 text-base leading-relaxed italic mb-6">
              “{t.text}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="h-14 w-14 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="text-black font-semibold text-lg">
                  {t.name}{" "}
                  <span className="text-sm text-gray-500">({t.country})</span>
                </h3>
                <p className="text-gray-500 text-sm">{t.role}</p>
                <p className="text-gray-800 text-xs uppercase font-semibold tracking-wide mt-1">
                  {t.service}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
