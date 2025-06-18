import { dummyStudentEnrolled } from "@/assets/assets";
import Loading from "@/components/student/Loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);
  return enrolledStudents ? (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>CourseTitle</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrolledStudents.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className={"flex items-center gap-4"}>
                <img
                  src={item.student.imageUrl}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <p>{item.student.name}</p>
              </TableCell>
              <TableCell>
                <p>{item.courseTitle}</p>
              </TableCell>
              <TableCell>
                <p>{new Date(item.purchaseDate).toLocaleDateString()}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
