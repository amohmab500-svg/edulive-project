const db = require("../db"); // هذا هو المسار الصحيح لملفك

// 1. جلب إعدادات الاتصال
exports.getContactSettings = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM site_contact_settings WHERE id = 1');
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "خطأ في جلب البيانات", error });
    }
};

// 2. تحديث إعدادات الاتصال
exports.updateContactSettings = async (req, res) => {
    const { phone_primary, phone_secondary, email, address, working_hours } = req.body;
    try {
        await db.query(
            'UPDATE site_contact_settings SET phone_primary=?, phone_secondary=?, email=?, address=?, working_hours=? WHERE id=1',
            [phone_primary, phone_secondary, email, address, working_hours]
        );
        res.json({ message: "تم تحديث بيانات الاتصال بنجاح" });
    } catch (error) {
        res.status(500).json({ message: "خطأ في التحديث", error });
    }
};

// 3. جلب روابط التواصل الاجتماعي
exports.getSocialLinks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM social_links ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "خطأ في جلب الروابط", error });
    }
};