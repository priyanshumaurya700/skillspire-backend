import bcrypt from "bcryptjs";
import registereduser from "../models/User.js";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await registereduser.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // generate token
    const generateToken = (id, role) => {
      return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    };

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
