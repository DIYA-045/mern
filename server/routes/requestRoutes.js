const express = require("express");

const {
  getMyPickupRequests,
  cancelPickupRequest,
} = require("../controllers/pickupController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's pickup requests
router.get("/my", protect, getMyPickupRequests);

// Cancel a pickup request
router.put("/:id/cancel", protect, cancelPickupRequest);

module.exports = router;