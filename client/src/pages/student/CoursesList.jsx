import { assets } from "@/assets/assets";
import CourseCard from "@/components/student/CourseCard";
import SearchBar from "@/components/student/SearchBar";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CoursesList = () => {
  const { allCourses, navigate } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const filtered = allCourses.slice();
      input
        ? setFilteredCourses(
            filtered.filter((course) =>
              course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourses(filtered);
    }
  }, [allCourses, input]);

  return (
    <section className="container__width mt-20">
      <h1>Course List</h1>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-1">
          <Link to="/" className="text-primary">
            Home
          </Link>
          / <p>Course List</p>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      {input && (
        <div className="inline-flex items-center gap-4 border rounded-md px-4 py-2 mt-4">
          <p>{input}</p>
          <img
            src={assets.cross_icon}
            onClick={() => {
              navigate("/course-list");
            }}
            alt="cross icon"
            className="cursor-pointer"
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CoursesList;
