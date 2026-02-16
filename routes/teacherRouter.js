import express from "express";
import { getTeachers } from "../controllers/teacherController";

const router = express.Router();

// get teacher
router.get("/teachers", getTeachers);


export default router;
