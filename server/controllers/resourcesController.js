const db = require("../db");

// GET all resources
const getResources = (req, res) => {
  const sql = `
    SELECT resources.*, levels.name AS level_name, teachers.name AS teacher_name
    FROM resources
    LEFT JOIN levels ON resources.level_id = levels.id
    LEFT JOIN teachers ON resources.teacher_id = teachers.id
    ORDER BY resources.created_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to fetch resources", error: err.message });
    res.status(200).json(result);
  });
};

// CREATE resource
const createResource = (req, res) => {
  const { title, description, type, file_url, external_url, level_id, teacher_id } = req.body;
  const sql = `INSERT INTO resources (title, description, type, file_url, external_url, level_id, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [title, description, type, file_url || null, external_url || null, level_id || null, teacher_id || null], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to create resource", error: err.message });
    res.status(201).json({ message: "Resource created successfully", id: result.insertId });
  });
};

// UPDATE resource
const updateResource = (req, res) => {
  const { id } = req.params;
  const { title, description, type, file_url, external_url, level_id, teacher_id } = req.body;
  const sql = `UPDATE resources SET title = ?, description = ?, type = ?, file_url = ?, external_url = ?, level_id = ?, teacher_id = ? WHERE id = ?`;
  db.query(sql, [title, description, type, file_url || null, external_url || null, level_id || null, teacher_id || null, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update resource", error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ message: "Resource updated successfully" });
  });
};

// DELETE resource
const deleteResource = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM resources WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete resource", error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ message: "Resource deleted successfully" });
  });
};

module.exports = { getResources, createResource, updateResource, deleteResource };