import { assets } from "@/assets/assets";
import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="pt-34 bg-gradient-to-b from-cyan-100/50 to-white">
      <div className="container__width flex flex-col items-center gap-6">
        <h1 className="font-bold text-center">
          Empower your future with the
          <br /> courses designed to{" "}
          <span className="text-primary relative">
            fit your choice.{" "}
            <img
              src={assets.sketch}
              alt="sketch"
              className="hidden md:block absolute right-0"
            />
          </span>
        </h1>
        <p className="text-center text-gray-400">
          We bring together world-class instructors to help you <br /> achieve
          your professional goals.
        </p>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
