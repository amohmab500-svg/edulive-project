const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Contact settings
router.get('/contact', settingsController.getContactSettings);
router.put('/contact', settingsController.updateContactSettings);

// Social links
router.get('/social', settingsController.getSocialLinks);

// Reviews
router.get('/reviews', settingsController.getReviews);

module.exports = router;