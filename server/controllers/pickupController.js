const PickupRequest = require("../models/PickupRequest");

// =====================================================
// CREATE PICKUP REQUEST
// =====================================================
const createPickupRequest = async (req, res) => {
  try {
    const {
      wasteType,
      quantity,
      pickupDate,
      preferredTime,
      pickupAddress,
      landmark,
      notes,
    } = req.body;

    if (
      !wasteType ||
      !quantity ||
      !pickupDate ||
      !preferredTime ||
      !pickupAddress
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const pickupRequest = await PickupRequest.create({
      user: req.user._id,
      wasteType,
      quantity,
      pickupDate,
      preferredTime,
      pickupAddress,
      landmark: landmark || "",
      notes: notes || "",
    });

    return res.status(201).json({
      message: "Pickup scheduled successfully 🌱",
      request: pickupRequest,
    });
  } catch (error) {
    console.error("Create pickup error:", error);

    return res.status(500).json({
      message: "Server error while scheduling pickup",
      error: error.message,
    });
  }
};

// =====================================================
// GET MY PICKUP REQUESTS
// =====================================================
const getMyPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      user: req.user._id,
    })
      .populate("collector", "fullName phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get pickup requests error:", error);

    return res.status(500).json({
      message: "Server error while fetching pickup requests",
      error: error.message,
    });
  }
};

// =====================================================
// CANCEL PICKUP REQUEST
// =====================================================
const cancelPickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Pickup request not found",
      });
    }

    if (
      request.status !== "Pending" &&
      request.status !== "Accepted"
    ) {
      return res.status(400).json({
        message: "This pickup request cannot be cancelled",
      });
    }

    request.status = "Cancelled";

    await request.save();

    return res.status(200).json({
      message: "Pickup request cancelled successfully",
      request,
    });
  } catch (error) {
    console.error("Cancel pickup error:", error);

    return res.status(500).json({
      message: "Server error while cancelling pickup",
      error: error.message,
    });
  }
};

module.exports = {
  createPickupRequest,
  getMyPickupRequests,
  cancelPickupRequest,
};