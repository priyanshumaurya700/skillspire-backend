import express from "express";
import {
  assignCourseTeacher,
  courseCreated,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/courseController.js";
import upload from "../middleware/upload.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const courseRouter = express.Router();

// "logo" = form-data ka field name
courseRouter.post(
  "/create",
  protect,
  adminOnly,
  upload.single("logo"),
  courseCreated,
);

// all courses
courseRouter.get("/all", getAllCourses);

// GET course by id
courseRouter.get("/:id", getCourseById);

// delete course by using the id
courseRouter.delete("/delete/:id", protect, adminOnly, deleteCourseById);

// update or edit course by using the id
courseRouter.put("/:id", protect, adminOnly, upload.any(), updateCourseById);

// assing course to a teacher
courseRouter.post("/assign", assignCourseTeacher);

export default courseRouter;
