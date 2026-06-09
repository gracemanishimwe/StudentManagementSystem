const express = require("express");
const router = express.Router();
const {
  getAttendance,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} = require("../controllers/AttendanceController");

router.get("/", getAttendance);
router.post("/", createAttendance);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;