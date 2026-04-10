const db = require("../db");
const bcrypt = require("bcryptjs");

// جلب بيانات الأدمن
const getProfile = (req, res) => {
  db.query(
    `SELECT id, full_name, email, phone, role, avatar, created_at FROM users WHERE role = 'admin' LIMIT 1`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });
      res.json(results[0]);
    }
  );
};

// تحديث بيانات الأدمن
const updateProfile = (req, res) => {
  const { full_name, email, phone } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: "Nom et email sont obligatoires" });
  }

  db.query(
    `UPDATE users SET full_name = ?, email = ?, phone = ? WHERE role = 'admin'`,
    [full_name, email, phone || null],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Profil mis à jour avec succès" });
    }
  );
};

// تغيير كلمة المرور
const changePassword = (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  db.query(`SELECT password FROM users WHERE role = 'admin' LIMIT 1`, async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const user = results[0];
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Mot de passe actuel incorrect" });
    }

    const hashed = await bcrypt.hash(new_password, 10);
    db.query(
      `UPDATE users SET password = ? WHERE role = 'admin'`,
      [hashed],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Mot de passe modifié avec succès" });
      }
    );
  });
};

module.exports = { getProfile, updateProfile, changePassword };