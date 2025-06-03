import { assets } from "@/assets/assets";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";

const SearchBar = ({ data }) => {
  const { navigate } = useContext(AppContext);

  const [input, setInput] = useState(data ? data : "");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate("course-list/" + input);
  };
  return (
    <form className="max-w-md flex items-center justify-between p-2 gap-2 border border-gray-200 rounded-sm">
      <img src={assets.search_icon} alt="search icon" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for a course"
        className="focus:outline-none"
      />
      <Button onClick={onSubmitHandler} type="submit" className="rounded-sm">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
