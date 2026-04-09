const express = require("express");
const router = express.Router();
const {
  getAttendance,
  getGroupStudents,
  saveAttendance,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

router.get("/history/:group_id", getAttendanceHistory);
router.get("/students/:group_id", getGroupStudents);
router.get("/", getAttendance);
router.post("/", saveAttendance);

module.exports = router;