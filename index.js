import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import path from "path";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve static files from the uploads directory
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
