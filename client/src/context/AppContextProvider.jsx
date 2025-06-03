import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "@/assets/assets";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = { navigate, allCourses, currency };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
