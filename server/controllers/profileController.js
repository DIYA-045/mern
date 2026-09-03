const User = require("../models/User");

// ==========================
// GET MY PROFILE
// ==========================
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);

    res.status(500).json({
      message: "Server error while getting profile",
    });
  }
};


// ==========================
// UPDATE MY PROFILE
// ==========================
const updateMyProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      address,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (fullName !== undefined) {
      user.fullName = fullName.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (address !== undefined) {
      user.address = address.trim();
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully 🌱",

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    res.status(500).json({
      message: "Server error while updating profile",
    });
  }
};


module.exports = {
  getMyProfile,
  updateMyProfile,
};