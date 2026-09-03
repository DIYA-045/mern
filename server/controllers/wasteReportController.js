const WasteReport = require("../models/WasteReport");

const createWasteReport = async (req, res) => {
  try {
    const {
      wasteType,
      location,
      description,
      urgency,
    } = req.body;

    if (!wasteType || !location || !description) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const report = await WasteReport.create({
      user: req.user._id,
      wasteType,
      location,
      description,
      urgency: urgency || "Medium",
    });

    return res.status(201).json({
      message: "Waste report submitted successfully 🌱",
      report,
    });
  } catch (error) {
    console.error("Create waste report error:", error);

    return res.status(500).json({
      message: "Server error while submitting waste report",
      error: error.message,
    });
  }
};

const getMyWasteReports = async (req, res) => {
  try {
    const reports = await WasteReport.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      reports,
    });
  } catch (error) {
    console.error("Get waste reports error:", error);

    return res.status(500).json({
      message: "Server error while fetching waste reports",
      error: error.message,
    });
  }
};

module.exports = {
  createWasteReport,
  getMyWasteReports,
};