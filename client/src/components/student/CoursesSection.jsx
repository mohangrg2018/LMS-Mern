import React, { useContext } from "react";
import CourseCard from "./CourseCard";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const { allCourses, navigate } = useContext(AppContext);
  return (
    <section className="container__width flex flex-col items-center gap-6">
      <h2>Learn from the best</h2>
      <p className="text-gray-400 text-center">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <Link
        to="/course-list"
        className="border rounded-sm px-8 py-2 hover:bg-gray-100/80"
      >
        Show all Courses
      </Link>
    </section>
  );
};

export default CoursesSection;
