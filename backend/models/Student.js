const mongoose = require("mongoose");

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

module.exports = mongoose.model("Student", studentSchema);