import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import Hero from "@/components/student/Hero";
import TestimonialsSection from "@/components/student/TestimonialsSection";
import React from "react";

const Home = () => {
  return (
    <main className="space-y-20">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
