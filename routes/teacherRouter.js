import express from "express";
import { getAssignedCourses, getTeachers } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const teacherRouter = express.Router();

// get teacher
teacherRouter.get("/teachers", getTeachers);

// get assigned courses for teacher
teacherRouter.get("/assigned-courses", protect, getAssignedCourses);


export default teacherRouter;
