import CourseAssignment from "../models/CourseAssignment.js";
import registereduser from "../models/User.js";

// Get all teachers
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

//  get assigned courses for teacher

export const getAssignedCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const assignments = await CourseAssignment.find({teacherId:req.user.id}).populate("courseId", "title description");
    
    const course = assignments.map(assignment => ({
      courseId: assignment.courseId.id,
      title: assignment.courseId.title,
      description: assignment.courseId.description,
    }));
    res.status(200).json({ assignments, course });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch assigned courses",
        error: error.message,
      });
  }
};
