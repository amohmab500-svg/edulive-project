const db = require("../db");

// GET all levels
const getLevels = (req, res) => {
  const sql = "SELECT * FROM levels ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch levels",
        error: err.message,
      });
    }

    res.status(200).json(result);
  });
};

// GET single level by id
const getLevelById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM levels WHERE id = ? LIMIT 1";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch level",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Level not found",
      });
    }

    res.status(200).json(result[0]);
  });
};

// CREATE level
const createLevel = (req, res) => {
  const { name, description, image } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Level name is required",
    });
  }

  const sql = "INSERT INTO levels (name, description, image) VALUES (?, ?, ?)";

  db.query(sql, [name, description || null, image || null], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to create level",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Level created successfully",
      id: result.insertId,
    });
  });
};

// UPDATE level
const updateLevel = (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Level name is required",
    });
  }

  const sql = `
    UPDATE levels
    SET name = ?, description = ?, image = ?
    WHERE id = ?
  `;

  db.query(sql, [name, description || null, image || null, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update level",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Level not found",
      });
    }

    res.status(200).json({
      message: "Level updated successfully",
    });
  });
};

// DELETE level
const deleteLevel = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM levels WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete level",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Level not found",
      });
    }

    res.status(200).json({
      message: "Level deleted successfully",
    });
  });
};

module.exports = {
  getLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
};