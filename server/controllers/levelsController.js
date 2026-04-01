const db = require("../db");

// GET all levels
const getLevels = (req, res) => {
  const sql = "SELECT * FROM levels ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(result);
  });
};

// CREATE level
const createLevel = (req, res) => {
  const { name, description, image } = req.body;

  const sql = "INSERT INTO levels (name, description, image) VALUES (?, ?, ?)";

  db.query(sql, [name, description, image], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
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

  const sql = "UPDATE levels SET name = ?, description = ?, image = ? WHERE id = ?";

  db.query(sql, [name, description, image, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
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
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({
      message: "Level deleted successfully",
    });
  });
};

module.exports = {
  getLevels,
  createLevel,
  updateLevel,
  deleteLevel,
};