import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    logo: { type: String},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
