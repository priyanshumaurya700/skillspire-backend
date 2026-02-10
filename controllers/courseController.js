import cloudinary from "../config/cloudinary.js";
import Course from "../models/Course.js";
import path from "path";

const getLevelFromPrice = (price) => {
  if (price < 1000) return "Beginner";
  if (price <= 5000) return "Intermediate";
  return "Advanced";
};

export const courseCreated = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    const logoPath = path.relative(process.cwd(), req.files[0].path); // Access the uploaded file path
    if (!logoPath) {
      return res.status(400).json({ message: "Course logo is required." });
    }

    // upload the image to cloudinary and get the url
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: "course_logo",
      },
      (error, result)=>{
        if(error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
    });

    const { title, description, price, startDate } = req.body;
    // Validate input
    if (!title || !description || !price || !startDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ message: "Price must be a number." });
    }
    const level = getLevelFromPrice(numericPrice);

    // Create new course
    const newCourse = new Course({
      title,
      description,
      price: numericPrice,
      startDate: new Date(startDate),
      level,
      logo: uploadResult.secure_url, //image path /url
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully.", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

// get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// delete course by using the id

export const deleteCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// get course by id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update or edit course by using the id
export const updateCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      const logoPath = req.files?.[0]?.path;
      const { title, description, price, startDate } = req.body;
      const level = getLevelFromPrice(Number(price));
      course.title = title ?? course.title;
      course.description = description ?? course.description;
      course.price = price ?? course.price;
      course.startDate = startDate ?? course.startDate;
      course.level = level ?? course.level;
      if (logoPath) {
        course.logo = logoPath;
      }
      await course.save();
      res.status(200).json({ message: "Course updated successfully", course });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};
