const express = require("express");

const {
  registerUser,
  verifyEmailOTP,
  resendOTP,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Verify OTP
router.post("/verify-otp", verifyEmailOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

module.exports = router;