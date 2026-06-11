import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
    },
    name: String,
    email: String,
    className: String,
    gender: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);