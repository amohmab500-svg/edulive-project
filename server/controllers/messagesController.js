const db = require("../db");

// جلب كل المحادثات
const getConversations = (req, res) => {
  const sql = `SELECT * FROM conversations ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// إنشاء محادثة جديدة
const createConversation = (req, res) => {
  const { title, type, group_id } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const sql = `INSERT INTO conversations (title, type, group_id) VALUES (?, ?, ?)`;
  db.query(sql, [title, type || "Groupe", group_id || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, type: type || "Groupe" });
  });
};

// حذف محادثة
const deleteConversation = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM conversations WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Conversation supprimée" });
  });
};

// جلب رسائل محادثة معينة
const getMessages = (req, res) => {
  const { conversationId } = req.params;
  const sql = `SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`;
  db.query(sql, [conversationId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// إرسال رسالة
const sendMessage = (req, res) => {
  const { conversationId } = req.params;
  const { content, sender_name } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  const sql = `INSERT INTO messages (conversation_id, sender_name, content) VALUES (?, ?, ?)`;
  db.query(sql, [conversationId, sender_name || "Admin", content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, conversation_id: conversationId, content, sender_name: sender_name || "Admin" });
  });
};

module.exports = { getConversations, createConversation, deleteConversation, getMessages, sendMessage };