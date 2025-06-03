import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "@/assets/assets";

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // average rating of courses
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let sum = 0;
    course.courseRatings.forEach((rating) => {
      sum += rating.rating;
    });
    return sum / course.courseRatings.length;
  };

  const value = {
    navigate,
    allCourses,
    currency,
    calculateRating,
    isEducator,
    setIsEducator,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
