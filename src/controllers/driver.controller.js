const driverService = require("../services/driver.service");

const registerDriver = (req, res) => {
  try {
    const driver = driverService.registerDriver(req.body);

    res.status(201).json(driver);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateLocation = (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const driver = driverService.updateLocation(
      req.params.id,
      latitude,
      longitude
    );

    res.json(driver);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerDriver,
  updateLocation,
};