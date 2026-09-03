const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: String,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Picked Up",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PickupRequest",
  pickupRequestSchema
);