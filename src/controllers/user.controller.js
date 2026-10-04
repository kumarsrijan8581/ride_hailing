const userService = require("../services/user.service");

const registerUser = (req, res) => {
  try {
    const user = userService.registerUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
};