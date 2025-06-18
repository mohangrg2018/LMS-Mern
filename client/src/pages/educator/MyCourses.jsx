import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);
  return courses ? (
    <section>
      <h2>My courses</h2>
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>All Courses</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Published On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="hidden lg:w-16"
                  />
                  <p>{course.courseTitle}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{course.enrolledStudents.length}</p>
                </TableCell>
                <TableCell>
                  {new Date(course.createdAt).toLocaleDateString()}
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

export default MyCourses;
