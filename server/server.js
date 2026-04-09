const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./db");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const levelsRoutes = require("./routes/levels");
const teachersRoutes = require("./routes/teachers");
const studentsRoutes = require("./routes/students");
const groupsRoutes = require("./routes/groups");
const registrationsRoutes = require("./routes/registrations");
const resourcesRoutes = require("./routes/resources");
const messagesRoutes = require("./routes/messages");
const contactMessagesRoutes = require("./routes/contactMessages");

const settingsRoutes = require('./routes/settingsRoutes');
const profileRoutes = require("./routes/profile");
const attendanceRoutes = require("./routes/attendance");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");



app.use("/api/levels", levelsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/contact-messages", contactMessagesRoutes);
app.use('/api/settings', settingsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ... باقي المسارات مثل app.use("/api/levels", ...) ...





app.get("/", (req, res) => {
  res.send("EduLive API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
