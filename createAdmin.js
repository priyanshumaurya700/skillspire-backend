import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "priyanshuadmin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("PriyanshuAdmin700@", 10);

    const admin = await User.create({
      name: "Priyanshu Maurya",
      email: "priyanshuadmin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully ✅");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
