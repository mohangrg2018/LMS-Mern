import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({ success: true, message: "User role updated to educator" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;
    if (!imageFile) {
      return res.json({
        success: false,
        message: "Please upload course image",
      });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educatorId = educatorId;
    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: "Course added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Courses

export const getEducatorCourses = async (req, res) => {
  try {
    const educatorId = req.auth.userId;
    const educatorCourses = await Course.find({ educatorId: educatorId });
    res.json({ success: true, data: educatorCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
