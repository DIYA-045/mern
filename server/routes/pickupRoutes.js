const express = require("express");

const {
  createPickupRequest,
  getMyPickupRequests,
  cancelPickupRequest,
} = require("../controllers/pickupController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create pickup
router.post("/", protect, createPickupRequest);

// Get user's pickup requests
router.get("/my", protect, getMyPickupRequests);

// Cancel pickup
router.put("/:id/cancel", protect, cancelPickupRequest);

module.exports = router;