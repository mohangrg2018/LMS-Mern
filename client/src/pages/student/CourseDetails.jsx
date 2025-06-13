import { assets } from "@/assets/assets";
import Loading from "@/components/student/Loading";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateCourseDuration,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateNoOfLectures,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = async () => {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse);
    };

    fetchCourseData();
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return courseData ? (
    <section className="bg-gradient-to-b from-cyan-100/50 to-white pt-10 lg:pt-32">
      <div className="container__width flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-32">
        {/* left column */}
        <div className="md:w-[60%] flex flex-col gap-10">
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
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
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
                            <p
                              onClick={() =>
                                setPlayerData({
                                  videoId: lecture.lectureUrl.split("/").pop(),
                                })
                              }
                              className="text-primary cursor-pointer"
                            >
                              Preview
                            </p>
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
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-2 shadow-md  pb-10">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img src={courseData.courseThumbnail} alt="" />
            )}
            <div className="flex flex-col gap-2 px-6">
              <div className="flex items-center gap-2">
                <img
                  src={assets.time_left_clock_icon}
                  alt="time left clock icon"
                />
                <p className="text-red-500">
                  <span className="font-medium">5 days</span> left at this
                  price!
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-2xl">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="text-gray-500 line-through">
                  {currency}
                  {courseData.coursePrice}
                </p>
                <p className="text-gray-500">{courseData.discount}% off</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <img src={assets.star} alt="star icon" />
                  <p className="text-gray-500">{calculateRating(courseData)}</p>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <img src={assets.time_clock_icon} alt="clock icon" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <img src={assets.lesson_icon} alt="book icon" />
                  <p>{calculateNoOfLectures(courseData)} Lessons</p>
                </div>
              </div>
              <Button className="rounded-md mt-4">
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </Button>
              <div className="mt-4">
                <p className="text-xl font-medium">What's in the course?</p>
                <ul className="text-gray-500 list-disc list-inside text-sm">
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
