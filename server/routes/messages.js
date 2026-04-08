const express = require("express");
const router = express.Router();
const {
  getConversations,
  createConversation,
  deleteConversation,
  getMessages,
  sendMessage,
} = require("../controllers/messagesController");

router.get("/conversations", getConversations);
router.post("/conversations", createConversation);
router.delete("/conversations/:id", deleteConversation);
router.get("/conversations/:conversationId/messages", getMessages);
router.post("/conversations/:conversationId/messages", sendMessage);

module.exports = router;