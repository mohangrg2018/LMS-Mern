import { assets, dummyDashboardData } from "@/assets/assets";
import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <section className="mt-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="p-4 flex items-center gap-4 border border-gray-400 rounded-md">
          <img src={assets.patients_icon} alt="" />
          <div>
            <p>{dashboardData.enrolledStudentsData.length}</p>
            <p>Total Enrollments</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 border border-gray-400 rounded-md">
          <img src={assets.appointments_icon} alt="" />
          <div>
            <p>{dashboardData.totalCourses}</p>
            <p>Total Courses </p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 border border-gray-400 rounded-md">
          <img src={assets.earning_icon} alt="" />
          <div>
            <p>
              {currency}
              {dashboardData.totalEarnings}
            </p>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <h2>Latest Enrollments</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.N.</TableHead>
              <TableHead>Students Name</TableHead>
              <TableHead>Course Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardData.enrolledStudentsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.student.name}</TableCell>
                <TableCell>
                  <p>{item.courseTitle}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default Dashboard;
