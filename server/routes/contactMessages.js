const express = require("express");
const router = express.Router();
const { getContactMessages, deleteContactMessage } = require("../controllers/contactMessagesController");

router.get("/", getContactMessages);
router.delete("/:id", deleteContactMessage);

module.exports = router;