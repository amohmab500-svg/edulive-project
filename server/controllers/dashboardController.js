const db = require("../db");

const getStats = (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM students) as students,
            (SELECT COUNT(*) FROM teachers) as teachers,
            (SELECT COUNT(*) FROM groups_table) as classes,
            (SELECT COUNT(*) FROM registrations WHERE status = 'pending') as pendingRequests
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

const getRecentRegistrations = (req, res) => {
    const sql = `
        SELECT r.*, l.name as course 
        FROM registrations r
        LEFT JOIN levels l ON r.level_id = l.id
        WHERE r.status = 'pending' 
        ORDER BY r.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const updateRegistrationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = "UPDATE registrations SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Statut mis à jour avec succès" });
    });
};

module.exports = { getStats, getRecentRegistrations, updateRegistrationStatus };