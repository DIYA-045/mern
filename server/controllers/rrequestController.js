const PickupRequest = require("../models/PickupRequest");

// GET MY REQUESTS
const getMyRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({
      user: req.user._id,
    })
      .populate("collector", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get requests error:", error);

    res.status(500).json({
      message: "Server error while fetching requests",
    });
  }
};

// CANCEL REQUEST
const cancelRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (
      request.status !== "Pending" &&
      request.status !== "Accepted"
    ) {
      return res.status(400).json({
        message: "This request cannot be cancelled",
      });
    }

    request.status = "Cancelled";
    request.collector = null;

    await request.save();

    res.status(200).json({
      message: "Pickup request cancelled successfully",
      request,
    });
  } catch (error) {
    console.error("Cancel request error:", error);

    res.status(500).json({
      message: "Server error while cancelling request",
    });
  }
};

module.exports = {
  getMyRequests,
  cancelRequest,
};