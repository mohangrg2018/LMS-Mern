import { assets } from "@/assets/assets";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  // const { navigate } = useContext(AppContext);

  const { openSignUp } = useClerk();
  const { user } = useUser();

  const isCourseListPage = location.pathname.includes("course-list");
  return (
    <header
      className={`py-4 sticky top-0 border-b ${
        isCourseListPage ? "bg-white" : "bg-cyan-200/30"
      }`}
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
