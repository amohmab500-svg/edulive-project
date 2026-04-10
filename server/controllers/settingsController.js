const db = require("../db");

// 1. Get contact settings
exports.getContactSettings = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM site_contact_settings WHERE id = 1');
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
};

// 2. Update contact settings
exports.updateContactSettings = async (req, res) => {
    const { phone_primary, phone_secondary, email, address, working_hours } = req.body;
    try {
        await db.query(
            'UPDATE site_contact_settings SET phone_primary=?, phone_secondary=?, email=?, address=?, working_hours=? WHERE id=1',
            [phone_primary, phone_secondary, email, address, working_hours]
        );
        res.json({ message: "Contact settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating", error });
    }
};

// 3. Get social links
exports.getSocialLinks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM social_links ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching links", error });
    }
};

// 4. Get reviews
exports.getReviews = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM reviews WHERE status = 'Active' ORDER BY id ASC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};