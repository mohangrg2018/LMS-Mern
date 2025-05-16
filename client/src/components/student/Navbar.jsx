import { assets } from "@/assets/assets";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const isCourseList = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <header
      className={`flex items-center justify-between container__width py-4 border-gray-500 border-b-1 ${
        isCourseList ? "bg-white" : "bg-cyan-100/70"
      }
        "hidden"}`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" />
      </Link>
      <div className="hidden md:flex items-center gap-5">
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Button variant="link" className="px-0">
                Become Educator
              </Button>
              |<Link to="/my-enrollments">My enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <Button onClick={() => openSignIn()}>Create Account</Button>
        )}
      </div>

      {/* For phone screens */}
      <div className="md:hidden flex items-center gap-2">
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Button variant="link" className="px-0">
                Become Educator
              </Button>
              |<Link to="/my-enrollments">My enrollments</Link>
            </>
          )}
        </div>
        <div className="ml-4">
          {user ? (
            <UserButton />
          ) : (
            <img
              onClick={() => openSignIn()}
              src={assets.user_icon}
              alt="user icon"
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
