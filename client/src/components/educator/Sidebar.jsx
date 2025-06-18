import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: assets.home_icon,
    },
    {
      name: "My Courses",
      path: "/educator/add-course",
      icon: assets.add_icon,
    },
    {
      name: "Add Course",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Students Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <section className="border-r pt-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 cursor-pointer ${
                isActive ? "bg-primary/20 border-r-4 border-primary/70" : ""
              }`
            }
          >
            <img src={item.icon} alt={`${item.name} icon`} />
            <p>{item.name}</p>
          </NavLink>
        ))}
      </section>
    )
  );
};

export default Sidebar;
