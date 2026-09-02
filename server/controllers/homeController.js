const home = (req, res) => {
  res.json({
    message: "Welcome to Online Learning Platform Backend"
  });
};

module.exports = { home };