const express = require("express");
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");

const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);     // ← Update route
router.delete("/:id", deleteStudent);

module.exports = router;