import express from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Example route for user registration
router.post("/register", registerUser);

// login user route can be added here similarly
router.post("/login", loginUser);


export default router;
