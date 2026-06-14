const Student = require("../models/Student");

// ✅ Robust Generate Student ID
const generateStudentId = async () => {
  try {
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastStudent && lastStudent.studentId) {
      const match = lastStudent.studentId.match(/^ST(\d{3})$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    return "ST" + String(nextNumber).padStart(3, "0");
  } catch (error) {
    console.error("ID Generation Error:", error);
    return "ST001";
  }
};

// ✅ GET ALL STUDENTS
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// ✅ ADD STUDENT
const addStudent = async (req, res) => {
  try {
    const { name, email, className, gender } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Student name is required" });
    }

    const studentId = await generateStudentId();

    const newStudent = new Student({
      studentId,
      name: name.trim(),
      email: email ? email.trim() : "",
      className: className ? className.trim() : "",
      gender,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Add Student Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate Student ID. Try again." });
    }
    res.status(500).json({ message: "Error adding student" });
  }
};

// ✅ UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { name, email, className, gender } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { 
        name: name?.trim(), 
        email: email?.trim(), 
        className: className?.trim(), 
        gender 
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ 
      message: "Student updated successfully", 
      student: updatedStudent 
    });
  } catch (error) {
    console.error("Update Student Error:", error);
    res.status(500).json({ message: "Error updating student" });
  }
};

// ✅ DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
};