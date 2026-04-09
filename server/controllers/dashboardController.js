const db = require("../db");

// 1. جلب الإحصائيات
const getStats = (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM students) as students,
            (SELECT COUNT(*) FROM teachers) as teachers,
            (SELECT COUNT(*) FROM groups_table) as classes,
            (SELECT COUNT(*) FROM registrations WHERE status = 'En attente') as pendingRequests
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

// 2. جلب الطلبات المعلقة
const getRecentRegistrations = (req, res) => {
    const sql = "SELECT * FROM registrations WHERE status = 'En attente' ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 3. تحديث حالة الطلب (هذه هي الدالة التي تسبب الخطأ حالياً)
const updateRegistrationStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = "UPDATE registrations SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Statut mis à jour avec succès" });
    });
};

// تأكد من وجود هذه الأسماء الثلاثة هنا بالضبط
module.exports = { 
    getStats, 
    getRecentRegistrations, 
    updateRegistrationStatus 
};