import Navbar from "@/components/educator/Navbar";
import Sidebar from "@/components/educator/Sidebar";
import { Outlet } from "react-router-dom";

const Educator = () => {
  return (
    <div>
      <Navbar />
      <div className="flex container__width gap-6">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Educator;
