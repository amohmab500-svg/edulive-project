const db = require("../db");

const getContactMessages = (req, res) => {
  db.query(`SELECT * FROM contact_messages ORDER BY created_at DESC`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const deleteContactMessage = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM contact_messages WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Message supprimé" });
  });
};

module.exports = { getContactMessages, deleteContactMessage };