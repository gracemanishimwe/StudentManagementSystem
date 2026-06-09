const Attendance = require("../models/Attendance");

// GET all attendance
const getAttendance = async (req, res) => {
  try {
    const data = await Attendance.find().populate("studentId");

    res.json(data);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// GET single attendance
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("studentId");

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    res.json(attendance);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// CREATE attendance
const createAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);

    await newAttendance.save();

    res.status(201).json(newAttendance);

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// UPDATE attendance
const updateAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedAttendance);

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// DELETE attendance
const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.json({
      message: "Attendance deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
};