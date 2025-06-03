import { assets } from "@/assets/assets";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-[#111827] mt-20">
      <div className="container__width grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-24 py-10">
        <div className="flex flex-col gap-6">
          <Link to="/">
            <img src={assets.logo_dark} alt="logo" />
          </Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-bold text-white">Company</p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">About us</Link>
            </li>
            <li>
              <Link to="#">Contact us</Link>
            </li>
            <li>
              <Link to="#">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-bold text-white">Subscribe to our newsletter</p>
          <p>
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-2 py-1 border border-gray-500 focus:outline-gray-500"
            />
            <Button type="submit" className="rounded-md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="container__width text-center border-t border-gray-600 py-4">
        <p className="text-sm">
          Copyright 2024 © GreatStack. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
