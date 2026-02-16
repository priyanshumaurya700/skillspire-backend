import express from "express";
import { getTeachers } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

// get teacher
teacherRouter.get("/teachers", getTeachers);


export default teacherRouter;
