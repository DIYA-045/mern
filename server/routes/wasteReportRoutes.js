const express = require("express");

const {
  createWasteReport,
  getMyWasteReports,
} = require("../controllers/wasteReportController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createWasteReport);

router.get("/my", protect, getMyWasteReports);

module.exports = router;