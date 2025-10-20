import React from "react";

const ImpactNumer = () => {
  return (
    <>
      
      <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-2xl flex flex-col justify-between items-start px-9 py-6 shadow">
          <div className="text-gray-400">/01</div>
          <div>
            <h3 className="text-4xl md:text-5xl text-start font-bold text-black pb-3">
              50+
            </h3>
            <p className="text-gray-700 text-base md:text-lg text-start">
              AI-powered products
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col justify-between items-start px-9 py-6 shadow">
          <div className="text-gray-400">/02</div>
          <div>
            <h3 className="text-4xl md:text-5xl text-start font-bold text-black pb-3">
              20+
            </h3>
            <p className="text-gray-700  text-base md:text-lg text-start">
              Global clients
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col justify-between items-start px-9 py-6 shadow">
          <div className="text-gray-400">/03</div>
          <div>
            <h3 className="text-4xl md:text-5xl text-start font-bold text-black pb-3">
              100%
            </h3>
            <p className="text-gray-700 text-base md:text-lg text-start">
              Customer satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row - 2 items on large, 1 on mobile */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <div className="bg-white rounded-2xl flex flex-col justify-between items-start px-9 py-6 shadow">
          <div className="text-gray-400">/04</div>
          <div>
            <h3 className="text-4xl md:text-5xl text-start font-bold text-black pb-3">
              10+
            </h3>
            <p className="text-gray-700  text-base md:text-lg text-start">
              Countries served
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col justify-between items-start px-9 py-6 shadow">
          <div className="text-gray-400">/05</div>
          <div>
            <h3 className="text-4xl md:text-5xl text-start font-bold text-black pb-3">
              24/7
            </h3>
            <p className="text-gray-700 text-base md:text-lg text-start">
              Continuous support
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpactNumer;
