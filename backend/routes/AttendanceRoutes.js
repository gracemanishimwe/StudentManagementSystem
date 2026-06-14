import express from "express";
import {
  getAttendance,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} from "../controllers/AttendanceController.js";

const router = express.Router();

router.get("/", getAttendance);
router.post("/", createAttendance);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;