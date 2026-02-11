import express from "express";
import {
  courseCreated,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/courseController.js";
import upload from "../middleware/upload.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";

const courseRouter = express.Router();

// "logo" = form-data ka field name
courseRouter.post("/create", upload.single("logo"), courseCreated);

// all courses
courseRouter.get("/all", getAllCourses);

// GET course by id
courseRouter.get("/:id", protect, getCourseById);

// delete course by using the id
courseRouter.delete("/delete/:id", deleteCourseById);

// update or edit course by using the id
courseRouter.put("/:id", upload.any(), updateCourseById);

export default courseRouter;
