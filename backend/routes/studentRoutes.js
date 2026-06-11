import express from "express";
import {
  getStudents,
  addStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getStudents);
router.post("/students", addStudent);
router.delete("/students/:id", deleteStudent);

export default router;