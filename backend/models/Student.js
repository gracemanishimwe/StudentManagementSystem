const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  className: String,
  gender: String
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);