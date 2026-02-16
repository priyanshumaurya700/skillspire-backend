import registereduser from "../models/User.js";


export const getTeachers = async (req, res) => {
  try {
    const teachers = await registereduser.find({ role: "teacher" });
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};
