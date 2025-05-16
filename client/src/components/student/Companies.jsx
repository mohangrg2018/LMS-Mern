import { assets } from "@/assets/assets";
import React from "react";

const Companies = () => {
  return (
    <section>
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 mt-8">
        <img
          src={assets.microsoft_logo}
          alt="microsoft"
          className="w-20 md:w-28"
        />
        <img
          src={assets.walmart_logo}
          alt="microsoft"
          className="w-20 md:w-28"
        />
        <img src={assets.adobe_logo} alt="microsoft" className="w-20 md:w-28" />
        <img
          src={assets.accenture_logo}
          alt="microsoft"
          className="w-20 md:w-28"
        />
      </div>
    </section>
  );
};

export default Companies;
