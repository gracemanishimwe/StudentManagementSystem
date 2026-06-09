const Student = require("../models/Student");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ studentId: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE student with auto studentId (S001, S002...)
const createStudent = async (req, res) => {
  try {
    const { name, email, className, gender } = req.body;

    // Generate next studentId (S001, S002, ...)
    const lastStudent = await Student.findOne().sort({ studentId: -1 });
    let newId = "S001";

    if (lastStudent && lastStudent.studentId) {
      const lastNumber = parseInt(lastStudent.studentId.slice(1));
      newId = `S${(lastNumber + 1).toString().padStart(3, '0')}`;
    }

    const newStudent = new Student({
      name,
      studentId: newId,
      email: email || "",
      className: className || "",
      gender: gender || "Male"
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE student
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};