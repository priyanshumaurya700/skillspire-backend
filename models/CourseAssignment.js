import mongoose from "mongoose";

const courseAssignment = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// prevent duplicate course-teacher assignments
courseAssignment.index({ courseId: 1, teacherId: 1 }, { unique: true });

export default mongoose.model("CourseAssignment", courseAssignment);
