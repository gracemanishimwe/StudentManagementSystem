import Student from "../models/Student.js";

// ✅ Generate ID (ST001, ST002...)
const generateStudentId = async () => {
  const lastStudent = await Student.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastStudent && lastStudent.studentId) {
    const lastNumber =
      parseInt(lastStudent.studentId.replace("ST", "")) || 0;
    nextNumber = lastNumber + 1;
  }

  return "ST" + String(nextNumber).padStart(3, "0");
};

// ✅ GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// ✅ ADD STUDENT
export const addStudent = async (req, res) => {
  try {
    const { name, email, className, gender } = req.body;

    const studentId = await generateStudentId(); // 🔥 IMPORTANT

    const newStudent = new Student({
      studentId,
      name,
      email,
      className,
      gender,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding student" });
  }
};

// ✅ DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};