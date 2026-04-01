const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const levelsRoutes = require("./routes/levels");

app.use("/api/levels", levelsRoutes);

app.get("/", (req, res) => {
  res.send("EduLive API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});