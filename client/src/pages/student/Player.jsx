import { assets } from "@/assets/assets";
import Rating from "@/components/student/Rating";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    getCourseData();
  }, []);
  return (
    <section className="container__width mt-10 lg:mt-20 flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-32">
      {/* Left column */}
      <div className="md:w-[60%] flex flex-col gap-10">
        <h2>Course Structure</h2>
        <div className="mt-4 flex flex-col gap-2 bg-white">
          {courseData?.courseContent?.map((chapter, index) => (
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
                        src={false ? assets.blue_tick_icon : assets.play_icon}
                        alt="play icon"
                        className="w-4 h-4"
                      />
                      <p>{lecture.lectureTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {lecture.lectureUrl && (
                        <p
                          onClick={() =>
                            setPlayerData({
                              ...lecture,
                              chapter: index + 1,
                              lecture: index + 1,
                            })
                          }
                          className="text-primary cursor-pointer"
                        >
                          Watch
                        </p>
                      )}
                      <p>
                        {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                          units: ["h", "m"],
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <h3 className="font-bold">Rate this course:</h3>
          <Rating initialRating={0} />
        </div>
      </div>

      {/* right column */}
      <div className="lg:w-[40%]">
        {playerData ? (
          <div>
            <YouTube
              videoId={playerData.lectureUrl.split("/").pop()}
              iframeClassName="w-full aspect-video"
            />
            <div className="flex items-center justify-between mt-2">
              <p>
                {playerData.chapter}.{playerData.lecture}{" "}
                {playerData.lectureTitle}
              </p>
              <Button variant={"link"}>
                {false ? "Completed" : "Mark Completed"}
              </Button>
            </div>
          </div>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : ""}
            alt="thumbnail"
          />
        )}
      </div>
    </section>
  );
};

export default Player;
