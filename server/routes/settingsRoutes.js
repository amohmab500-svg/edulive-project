const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
// const { verifyToken, isAdmin } = require('../middleware/auth'); // للتأكد من الصلاحيات لاحقاً

// مسارات بيانات الاتصال
router.get('/contact', settingsController.getContactSettings);
router.put('/contact', settingsController.updateContactSettings);

// مسارات التواصل الاجتماعي
router.get('/social', settingsController.getSocialLinks);

module.exports = router;