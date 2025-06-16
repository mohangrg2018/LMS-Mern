import { assets } from "@/assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  return (
    <header className=" py-4 border-b border-gray-300">
      <div className="container__width flex items-center justify-between">
        <Link to="/">
          <img src={assets.logo} alt="site logo" />
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-sm">Hi, {user ? user.fullName : "Developers"}</p>
          {user ? <UserButton /> : <img src={assets.profile_img} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
