import express from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example route for user registration
router.post("/register", registerUser);

// login user route can be added here similarly
router.post("/login", loginUser);

// user profile route can be added here similarly
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
