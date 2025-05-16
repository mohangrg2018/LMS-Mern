import Companies from "@/components/student/Companies";
import Hero from "@/components/student/Hero";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <Companies />
    </main>
  );
};

export default Home;
