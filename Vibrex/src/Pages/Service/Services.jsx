import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";
import service4 from "../../assets/service4.png";
import service5 from "../../assets/service5.png";
import service6 from "../../assets/service6.jpg";
import service7 from "../../assets/service7.jpg";
import service8 from "../../assets/service8.jpg";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  const services = [
    {
      title: "UI/UX Design",
      desc: "Your users will find the app easy to use. Our UI and UX services ensure your product is user-friendly so it appeals and connects with users on any device.",
      items: [
        "UI UX Design",
        "UX Audit",
        "Design System",
        "UI UX Consulting",
        "UX Research",
        "Usability Testing",
        "Wireframe & UI Prototyping",
      ],
      img: service1,
    },
    {
      title: "Web Design",
      desc: "You don’t just need a website, you need a sales machine. Our designs are user-friendly, responsive, and SEO-friendly, driving more clicks and conversions.",
      items: [
        "Web Design",
        "SaaS Design",
        "Product Design",
        "Website Redesign",
        "B2B Website Design",
        "Landing Page Design",
        "E-commerce Design",
        "Startup Web Design",
      ],
      img: service2,
    },
    {
      title: "Mobile App Design",
      desc: "Make your app feel effortless from the first tap. We produce clean, functional apps that guide users confidently and improve daily engagement.",
      items: [
        "Mobile App Design",
        "Design Systems",
        "iOS App Design",
        "Android App Design",
        "App Redesign",
        "UX Design",
        "UI Design",
        "Usability Testing",
      ],
      img: service3,
    },
    {
      title: "Branding & Identity",
      desc: "Turn first impressions into lasting trust. From logos to strategy, we unify every detail to ensure your brand inspires recognition across platforms.",
      items: [
        "Branding & Identity",
        "Corporate Identity Design",
        "Brand Strategy",
        "Motion Graphics Design",
        "Graphic Design",
        "Startup Branding",
        "Logo Design",
      ],
      img: service4,
    },
    {
      title: "Design & Development",
      desc: "Skip the handoff headaches. Our single team ensures visually appealing products built to scale — one process, zero delays.",
      items: [
        "Build Product (MVP)",
        "Webflow",
        "Conversion Rate Optimization",
        "Shopify Development",
        "A/B Testing & QA",
        "WordPress Development",
        "AI Based Application Development",
        "Web App Development",
        "Mobile App Development",
      ],
      img: service5,
    },
    {
      title: "Artificial Intelligence Solutions",
      desc: "We provide intelligent AI-powered solutions that make businesses smarter and more efficient.",
      items: [
        "AI Chatbots & Virtual Assistants",
        "AI Agents for Automation",
        "Predictive Analytics",
        "Natural Language Processing (NLP)",
        "Machine Learning Models",
        "Computer Vision Solutions",
        "AI Integration in Existing Systems",
      ],
      img: service6,
    },
    {
      title: "Dedicated Development Team",
      desc: "Hire skilled developers on a monthly retainer and scale your projects without recruitment stress.",
      items: [
        "Frontend Developers",
        "Backend Developers",
        "Full-Stack Developers",
        "Mobile Developers",
        "DevOps Engineers",
        "QA & Test Automation Engineers",
        "AI/ML Engineers",
        "Long-Term IT Partnerships",
      ],
      img: service7,
    },
    {
      title: "Performance & Security",
      desc: "We keep your systems fast, secure, and always online.",
      items: [
        "Website & App Performance Optimization",
        "Security Audits & Penetration Testing",
        "24/7 Monitoring & Maintenance",
        "Cloud Hosting & Scalability",
        "Data Backup & Disaster Recovery",
        "DDoS Protection & Firewall Setup",
        "Load & Stress Testing",
      ],
      img: service8,
    },
  ];

  useEffect(() => {
    const sections = containerRef.current.querySelectorAll(".service-section");

    sections.forEach((section, i) => {
      const content = section.querySelector(".service-content");
      const image = section.querySelector(".service-image");
      const items = section.querySelectorAll(".service-item");

      gsap.fromTo(
        image,
        { x: i % 2 === 0 ? -100 : 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        content,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-600">
          We provide end-to-end digital solutions, from design to development,
          ensuring your business thrives in the modern digital world.
        </p>
      </div>

      <div className="space-y-20">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-section flex flex-col lg:flex-row items-start gap-25 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="service-image w-full lg:w-1/2 opacity-0">
              <img
                src={service.img}
                alt={service.title}
                className="w-full rounded-2xl shadow-md"
              />
            </div>

            {/* Content */}
            <div className="service-content w-full lg:w-1/2 opacity-0">
              <h3 className="text-4xl md:text-6xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-900 text-[20px] mb-6">{service.desc}</p>

              <ul className="space-y-7">
                {service.items.map((item, i) => (
                  <li
                    key={i}
                    className="service-item flex items-center gap-5 border-b border-[#d2cfcf] text-2xl text-gray-900 opacity-0"
                  >
                    <span className="font-light text-[15px] text-gray-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-normal text-[20px]">{item}</span>
                    <FaArrowRight className="text-gray-500 font-light ml-auto size-3 rotate-340" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
