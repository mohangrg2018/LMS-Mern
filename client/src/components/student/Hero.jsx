import { assets } from "@/assets/assets";
import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="w-full h-[50vh] md:h-[80vh] bg-linear-to-b from-cyan-100/70">
      <div className="container__width flex flex-col justify-center gap-6 h-full max-w-3xl mx-auto">
        <h1 className="text-center font-medium md:font-bold leading-10 md:leading-14">
          Empower your future with the courses designed
          <br /> to
          <span className="relative text-primary ml-2">
            fit your choice.
            <img
              src={assets.sketch}
              alt="sketch"
              className="hidden md:block absolute right-0"
            />
          </span>
        </h1>
        <p className="text-center text-gray-400">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
