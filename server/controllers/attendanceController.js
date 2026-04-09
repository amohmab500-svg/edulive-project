const db = require("../db");

const getAttendance = (req, res) => {
  const { group_id, date } = req.query;

  if (!group_id || !date) {
    return res.status(400).json({ error: "group_id and date are required" });
  }

  const sql = `
    SELECT a.*, s.name AS student_name
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.group_id = ? AND a.attendance_date = ?
    ORDER BY s.name
  `;

  db.query(sql, [group_id, date], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getGroupStudents = (req, res) => {
  const { group_id } = req.params;

  const sql = `
    SELECT id, name AS full_name, email FROM students
    WHERE group_id = ?
    ORDER BY name
  `;

  db.query(sql, [group_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const saveAttendance = (req, res) => {
  const { group_id, date, attendance } = req.body;

  if (!group_id || !date || !attendance || attendance.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    `DELETE FROM attendance WHERE group_id = ? AND attendance_date = ?`,
    [group_id, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const values = attendance.map((a) => [
        a.student_id,
        group_id,
        date,
        a.status,
      ]);

      db.query(
        `INSERT INTO attendance (student_id, group_id, attendance_date, status) VALUES ?`,
        [values],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Présence enregistrée avec succès" });
        }
      );
    }
  );
};

const getAttendanceHistory = (req, res) => {
  const { group_id } = req.params;

  const sql = `
    SELECT 
      a.attendance_date,
      COUNT(*) as total,
      SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_count,
      SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent_count
    FROM attendance a
    WHERE a.group_id = ?
    GROUP BY a.attendance_date
    ORDER BY a.attendance_date DESC
  `;

  db.query(sql, [group_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { getAttendance, getGroupStudents, saveAttendance, getAttendanceHistory };