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

app.use("/api/levels", levelsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/registrations", registrationsRoutes);

app.get("/", (req, res) => {
  res.send("EduLive API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});