import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import uniqid from "uniqid";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCoureseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
    collapsed: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter title");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  // Add the lecture
  const addLecture = () => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(),
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );

    setShowPopUp(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
      collapsed: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write course description",
      });
    }
  }, []);

  return (
    <section className="max-w-[80%] lg:max-w-[50%] mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>Course Title</p>
          <input
            onChange={(e) => setCoureseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            className="w-full outline-none border border-gray-200 p-2 rounded-md"
          />
        </div>
        <div>
          <p className="mb-2">Course Description</p>
          <div
            ref={editorRef}
            className="w-full min-h-[150px] break-all p-2"
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              className="outline-none border border-gray-200 p-2 rounded "
            />
          </div>
          <div>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage">
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded cursor-pointer"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img src={URL.createObjectURL(image)} alt="thumbnail preview" />
              )}
            </label>
          </div>
        </div>

        <div>
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            min={0}
            max={100}
            type="number"
            className="outline-none border border-gray-200 p-2 rounded "
          />
        </div>

        {/* Adding Chapters and Lectures */}
        <div className="flex flex-col gap-6">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 p-2">
                <div className="flex items-center">
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={assets.dropdown_icon}
                    alt=""
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span>{chapter.chapterContent.length} Lectures</span>
                <img
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              {!chapter.collapsed && (
                <div className="mt-4 px-2">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -
                        {lecture.lectureDuration} mins -
                        <a href={lecture.lectureUrl}>Link</a> -
                        {lecture.isPreviewFree ? "free Preview" : "paid"}
                      </span>
                      <img
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                        src={assets.cross_icon}
                        alt=""
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                  <div className="px-2 pb-4">
                    <div
                      onClick={() => handleLecture("add", chapter.chapterId)}
                      className="inline-flex bg-gray-100 p-2 rounded cursor-pointer"
                    >
                      + Add Lecture
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center bg-blue-100 p-2 rounded cursor-pointer"
          >
            + Add Chapter
          </div>

          {showPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-5">
              <div className="bg-white p-4 rounded relative flex flex-col gap-4">
                <h4>Add Lecture</h4>
                <div>
                  <p>Lecture Title</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureTitle}
                    type="text"
                    className="outline-none border border-gray-200 p-2 rounded "
                  />
                </div>

                <div>
                  <p>Duration (minutes)</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureDuration}
                    type="number"
                    className="outline-none border border-gray-200 p-2 rounded "
                  />
                </div>

                <div>
                  <p>Lecture URL</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureUrl}
                    type="text"
                    className="outline-none border border-gray-200 p-2 rounded "
                  />
                </div>

                <div className="flex items-center gap-4">
                  <p>Is Preview Free</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    checked={lectureDetails.isPreviewFree}
                    type="checkbox"
                  />
                </div>
                <div>
                  <Button onClick={addLecture} className="rounded">
                    Add
                  </Button>
                  <img
                    onClick={() => setShowPopUp(false)}
                    src={assets.cross_icon}
                    alt=""
                    className="absolute top-4 right-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <Button className="rounded">ADD</Button>
      </form>
    </section>
  );
};

export default AddCourse;
