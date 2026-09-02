const mongoose = require("mongoose");

const wasteReportSchema = new mongoose.Schema(
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

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Reported", "Under Review", "Resolved"],
      default: "Reported",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WasteReport",
  wasteReportSchema
);