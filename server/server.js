const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const requestRoutes = require("./routes/requestRoutes");
const wasteReportRoutes = require("./routes/wasteReportRoutes");
const homeRoutes = require("./routes/homeRoutes");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/waste-reports", wasteReportRoutes);
app.use("/api/home", homeRoutes);

app.get("/", (req, res) => {
  res.send("EcoTrack Backend is running 🌱");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});