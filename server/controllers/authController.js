const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTPEmail = require("../config/email");

// =====================================================
// GENERATE 6-DIGIT OTP
// =====================================================
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// =====================================================
// REGISTER USER
// =====================================================
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      role,
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !address ||
      !role
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check role
    if (!["user", "collector"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check whether user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    // =================================================
    // EXISTING BUT UNVERIFIED USER
    // =================================================
    if (existingUser) {
      if (!existingUser.isEmailVerified) {
        const otp = generateOTP();

        await User.updateOne(
          {
            _id: existingUser._id,
          },
          {
            $set: {
              fullName: fullName,
              phone: phone,
              address: address,
              role: role,
              emailOTP: otp,
              emailOTPExpires: new Date(
                Date.now() + 10 * 60 * 1000
              ),
            },
          }
        );

        // Send new OTP
        await sendOTPEmail(existingUser.email, otp);

        console.log(
          `Registration OTP sent to ${existingUser.email}`
        );

        return res.status(200).json({
          message:
            "A new verification OTP has been sent to your email.",
          requiresVerification: true,
          email: existingUser.email,
        });
      }

      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // =================================================
    // HASH PASSWORD
    // =================================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // =================================================
    // CREATE USER
    // =================================================
    const user = await User.create({
      fullName: fullName,
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone,
      address: address,
      role: role,
      isEmailVerified: false,
      emailOTP: otp,
      emailOTPExpires: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    // =================================================
    // SEND OTP EMAIL
    // =================================================
    await sendOTPEmail(user.email, otp);

    console.log(
      `Registration OTP sent to ${user.email}`
    );

    return res.status(201).json({
      message:
        "Registration successful. Please verify your email.",
      requiresVerification: true,
      email: user.email,
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// =====================================================
// VERIFY EMAIL OTP
// =====================================================
const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const enteredOTP = String(otp).trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =================================================
    // DEBUG INFORMATION
    // =================================================
    console.log("");
    console.log("========== OTP VERIFICATION ==========");
    console.log("Email:", user.email);
    console.log("Entered OTP:", enteredOTP);
    console.log("Stored OTP:", user.emailOTP);
    console.log("OTP Expiry:", user.emailOTPExpires);
    console.log("Current Time:", new Date());
    console.log("======================================");
    console.log("");

    // Already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // No OTP
    if (!user.emailOTP || !user.emailOTPExpires) {
      return res.status(400).json({
        message:
          "No active OTP. Please request a new OTP.",
      });
    }

    // Check expiration
    if (new Date() > user.emailOTPExpires) {
      return res.status(400).json({
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // =================================================
    // COMPARE OTP
    // =================================================
    const storedOTP = String(user.emailOTP).trim();

    if (storedOTP !== enteredOTP) {
      console.log("OTP DOES NOT MATCH");

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // =================================================
    // OTP CORRECT
    // =================================================
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          isEmailVerified: true,
        },
        $unset: {
          emailOTP: "",
          emailOTPExpires: "",
        },
      }
    );

    console.log(
      `Email verified successfully: ${user.email}`
    );

    return res.status(200).json({
      message: "Email verified successfully 🌱",
    });

  } catch (error) {
    console.error(
      "OTP verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during email verification",
      error: error.message,
    });
  }
};

// =====================================================
// RESEND OTP
// =====================================================
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check verification
    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // Generate NEW OTP
    const otp = generateOTP();

    console.log("");
    console.log("========== RESEND OTP ==========");
    console.log("Email:", user.email);
    console.log("New OTP:", otp);
    console.log("================================");
    console.log("");

    // =================================================
    // SAVE OTP WITHOUT MONGOOSE VALIDATION
    // =================================================
    const updateResult = await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          emailOTP: otp,
          emailOTPExpires: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      }
    );

    console.log(
      "MongoDB OTP update:",
      updateResult.modifiedCount
    );

    // =================================================
    // SEND EMAIL
    // =================================================
    await sendOTPEmail(user.email, otp);

    console.log(
      `New OTP email sent successfully to ${user.email}`
    );

    return res.status(200).json({
      message:
        "A new OTP has been sent to your email.",
    });

  } catch (error) {
    console.error(
      "Resend OTP error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while sending OTP",
      error: error.message,
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Please enter email and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // =================================================
    // EMAIL VERIFICATION CHECK
    // =================================================
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // =================================================
    // CHECK PASSWORD
    // =================================================
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // =================================================
    // CREATE JWT
    // =================================================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // =================================================
    // LOGIN SUCCESS
    // =================================================
    return res.status(200).json({
      message: "Login successful",

      token,

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
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during login",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================
module.exports = {
  registerUser,
  verifyEmailOTP,
  resendOTP,
  loginUser,
};