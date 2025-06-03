import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link
      to={"/course/" + course._id}
      className="flex flex-col border rounded-md"
    >
      <img
        src={course.courseThumbnail}
        alt="course thumbnail"
        className="rounded-t-md"
      />
      <div className="p-4 flex flex-col gap-1">
        <p className="font-bold">{course.courseTitle}</p>
        <p>{course.educator.name}</p>
        <div className="flex items-center gap-2">
          <p>{calculateRating(course)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={
                  index < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
              />
            ))}
          </div>
          <p>{course.courseRatings.length}</p>
        </div>
        <p>
          {currency}
          {course.coursePrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
