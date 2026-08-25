console.log("authRoutes loaded");

const express = require("express");

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Register API Working");
});

router.get("/login", (req, res) => {
  res.send("Login API Working");
});

module.exports = router;