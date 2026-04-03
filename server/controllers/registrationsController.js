const db = require("../db");

// GET all registrations
const getRegistrations = (req, res) => {
  const sql = `
    SELECT 
      registrations.*,
      levels.name AS level_name
    FROM registrations
    LEFT JOIN levels ON registrations.level_id = levels.id
    ORDER BY registrations.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch registrations",
        error: err.message,
      });
    }

    res.status(200).json(result);
  });
};

// GET registration by id
const getRegistrationById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      registrations.*,
      levels.name AS level_name
    FROM registrations
    LEFT JOIN levels ON registrations.level_id = levels.id
    WHERE registrations.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch registration",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json(result[0]);
  });
};

// CREATE registration
const createRegistration = (req, res) => {
  const { full_name, email, phone, level_id, message } = req.body;

  if (!full_name || full_name.trim() === "") {
    return res.status(400).json({
      message: "Full name is required",
    });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  const sql = `
    INSERT INTO registrations (full_name, email, phone, level_id, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, phone || null, level_id || null, message || null],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to create registration",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Registration created successfully",
        id: result.insertId,
      });
    }
  );
};

// UPDATE registration status

  const updateRegistration = (req, res) => {
  const { id } = req.params;
  const { status, rejection_reason } = req.body;

  const allowedStatuses = ["pending", "approved", "rejected"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  const sql = `
    UPDATE registrations
    SET status = ?, rejection_reason = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, rejection_reason || null, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update registration status",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Registration not found",
        });
      }

      res.status(200).json({
        message: "Registration status updated successfully",
      });
    }
  );
};

// DELETE registration
const deleteRegistration = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM registrations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete registration",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration deleted successfully",
    });
  });
};

module.exports = {
  getRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};