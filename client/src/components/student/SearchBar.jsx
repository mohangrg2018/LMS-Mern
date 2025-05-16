import { assets } from "@/assets/assets";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/course-list/${input}`);
  };

  return (
    <section className="flex items-center justify-center">
      <form
        onSubmit={onSearchHandler}
        className="flex items-center gap-4 border p-2 rounded-sm"
      >
        <img src={assets.search_icon} alt="search icon" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="outline-none"
          placeholder="Search for courses"
        />
        <Button className="rounded-sm">Search</Button>
      </form>
    </section>
  );
};

export default SearchBar;
