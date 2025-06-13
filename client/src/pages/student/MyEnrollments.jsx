import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
const MyEnrollments = () => {
  const {
    enrolledCourses,
    fetchUserEnrolledCourses,
    calculateCourseDuration,
    navigate,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 1,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 4,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
  ]);
  return (
    <section className="container__width mt-10 lg:mt-20">
      <h1>MyEnrollments</h1>
      <Table className="mt-10 border">
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead>Course</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrolledCourses.map((course, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-4">
                <img
                  src={course.courseThumbnail}
                  alt=""
                  className="w-14 sm:w-24"
                />

                {/* This wrapper should grow to fill all available space */}
                <div className="flex-1">
                  <p className="mb-2">{course.courseTitle}</p>
                  <div className="w-full">
                    <Progress
                      value={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                    />
                  </div>
                </div>
              </TableCell>

              <TableCell>{calculateCourseDuration(course)}</TableCell>
              <TableCell>
                {progressArray[index] &&
                  `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}
                <span> Lectures</span>
              </TableCell>
              <TableCell>
                <Button onClick={() => navigate("/player/" + course._id)}>
                  {progressArray[index] &&
                  progressArray[index].lectureCompleted /
                    progressArray[index].totalLectures ===
                    1
                    ? "Completed"
                    : "On Going"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default MyEnrollments;
