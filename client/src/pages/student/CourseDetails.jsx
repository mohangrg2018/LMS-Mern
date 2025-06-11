import { assets } from "@/assets/assets";
import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});

  const { allCourses, calculateRating, calculateChapterTime } =
    useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return courseData ? (
    <section className="bg-gradient-to-b from-cyan-100/50 to-white pt-32">
      <div className="container__width flex flex-col-reverse lg:flex-row justify-between gap-32">
        {/* left column */}
        <div className="md:w-[70%] flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">{courseData.courseTitle}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>

            {/* Course Rating */}
            <div className="flex items-center gap-2">
              <p>{calculateRating(courseData)}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                  />
                ))}
              </div>
              <p className="text-primary">
                ({courseData.courseRatings.length}
                {courseData.courseRatings.length > 1 ? " ratings" : " rating"})
              </p>
              <p className="text-gray-500">
                {courseData.enrolledStudents.length}
                {courseData.enrolledStudents.length > 1
                  ? " students"
                  : " student"}
              </p>
            </div>
            <p>
              Course by <span className="text-primary">Mohan</span>
            </p>
          </div>
          <div>
            <h3 className="font-bold">Course Structure</h3>
            <div className="mt-4 flex flex-col gap-2 bg-white">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="flex flex-col border p-3 rounded">
                  <div className="flex justify-between cursor-pointer">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => toggleSection(index)}
                    >
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p>{chapter.chapterTitle}</p>
                    </div>
                    <div>
                      <p>
                        {chapter.chapterContent.length} lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>
                  </div>
                  <ul
                    className={`${
                      openSection[index] ? "" : "hidden"
                    } border-t transition-all duration-600 py-4 mt-4 flex flex-col gap-2`}
                  >
                    {chapter.chapterContent.map((lecture, index) => (
                      <li
                        key={index}
                        className="text-sm flex justify-between items-center"
                      >
                        <div className="flex gap-2">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4"
                          />
                          <p>{lecture.lectureTitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {lecture.isPreviewFree && (
                            <p className="text-primary">Preview</p>
                          )}
                          <p>
                            {humanizeDuration(
                              lecture.lectureDuration * 60 * 1000,
                              { units: ["h", "m"] }
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Course Description</h3>
            <div>
              <p
                className="text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              ></p>
            </div>
          </div>
        </div>
        {/* right column */}
        <div className="md:w-[30%]">
          <p>right</p>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
