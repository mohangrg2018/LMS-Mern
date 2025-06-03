import { assets } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignUp } = useClerk();
  const { user } = useUser();
  const location = useLocation();

  const isCourseListPage = location.pathname.includes("course-list");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgClass = scrolled || isCourseListPage ? "bg-white" : "bg-cyan-200/30";

  return (
    <header
      className={`py-4 sticky top-0 z-50 border-b border-gray-500 transition-colors duration-300 ${bgClass}`}
    >
      <div className="container__width flex justify-between items-center">
        <Link to="/">
          <img src={assets.logo} alt="site logo" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              <Link to="/educator">Become Educator</Link>|
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <Button onClick={() => openSignUp()}>Create Account</Button>
          )}
        </div>

        {/* For Smaller Screens */}
        <div className="md:hidden flex items-center gap-6">
          {user && (
            <>
              <Link to="/educator">Become Educator</Link>|
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <Button onClick={() => openSignUp()}>Create Account</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
