import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/Slices/Gallery";
import { gsap } from "gsap";

const ShowCase = () => {
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.gallery); // ya state.products agar store me wahi rakha hai

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".card") ?? [];

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [products]); // jab bhi products update ho to animation chale

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div
      className="px-6 md:px-16 py-20 bg-black text-white font-sans"
      ref={sectionRef}
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-center mb-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white">
          Our Latest Work
        </h1>
      </div>

    
      {/* Project Cards */}
      <div className="flex flex-wrap justify-between gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="
              card 
              relative 
              w-[100%]          
              sm:w-[48%]       
              md:w-[48%]       
              lg:w-[48%]       
              h-[300px] md:h-[350px] lg:h-[550px] 
              
              overflow-hidden 
              rounded-2xl 
              shadow-2xl 
              cursor-pointer 
              group
            "
          >
            {product.mediaType === "image" ? (
              <img
                src={product.mediaUrl}
                alt={product.name}
                className="w-full h-full object-cover overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <video
                src={product.mediaUrl}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500"
              ></video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCase;
