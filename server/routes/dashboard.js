const express = require("express");
const router = express.Router();
// استيراد الدوال الثلاث
const { 
    getStats, 
    getRecentRegistrations, 
    updateRegistrationStatus 
} = require("../controllers/dashboardController");

// المسارات - تأكد أن الأسماء تطابق ما استوردناه بالأعلى
router.get("/stats", getStats);
router.get("/recent-registrations", getRecentRegistrations);
router.put("/registration/:id", updateRegistrationStatus); // السطر 9 الذي كان يسبب المشكلة

module.exports = router;