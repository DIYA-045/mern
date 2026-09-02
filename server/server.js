const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const requestRoutes = require("./routes/requestRoutes");
const wasteReportRoutes = require("./routes/wasteReportRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EcoTrack Backend is running 🌱",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/waste-reports", wasteReportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EcoTrack server running on port ${PORT}`);
});