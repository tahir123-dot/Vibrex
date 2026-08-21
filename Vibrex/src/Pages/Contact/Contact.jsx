
//import contact from "../../assets/contact.jpg";
import HubSpotContactForm from "./HubSpotContactForm";


export default function Contact() {
 
  return (
    <div className="bg-[#8d8d8d] text-gray-200">
      <section
        className="relative flex flex-col items-start justify-center 
             px-6 md:px-16 lg:px-24 h-screen max-h-[900px] overflow-hidden 
             bg-cover bg-center bg-no-repeat"
       // style={{ backgroundImage: `url(${contact})` }}
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
    
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-extrabold mb-8 text-white tracking-tight">
          Or Fill Out Our Form
        </h2>
        <HubSpotContactForm />
      </section>
    </div>
  );
}
