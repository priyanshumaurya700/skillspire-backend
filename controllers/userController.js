import bcrypt from "bcryptjs";
import registereduser from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ role validation
    if (!role || !["student", "teacher"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid role",
      });
    }

    // Check if user already exists
    const existingUser = await registereduser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // encoding password can be added here
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await registereduser.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
