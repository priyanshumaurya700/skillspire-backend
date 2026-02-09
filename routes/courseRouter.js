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

const courseRouter = express.Router();

// "logo" = form-data ka field name
courseRouter.post("/create", upload.array("logo", 1), courseCreated);

// all courses
courseRouter.get("/all", getAllCourses);

// GET course by id
courseRouter.get("/:id", getCourseById);

// delete course by using the id
courseRouter.delete("/delete/:id", deleteCourseById);

// update or edit course by using the id
courseRouter.put("/:id", upload.any(), updateCourseById);

export default courseRouter;
