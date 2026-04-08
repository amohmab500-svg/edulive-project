const express = require("express");
const router = express.Router();
const {
  getAttendance,
  getGroupStudents,
  saveAttendance,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

router.get("/", getAttendance);
router.get("/students/:group_id", getGroupStudents);
router.post("/", saveAttendance);
router.get("/history/:group_id", getAttendanceHistory);

module.exports = router;