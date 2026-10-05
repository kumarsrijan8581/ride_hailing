const {
  rideService,
} = require("../services");

const bookRide = (req, res) => {
  try {
    const ride = rideService.bookRide(
      req.body
    );

    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getRide = (req, res) => {
  try {
    const ride = rideService.getRide(
      req.params.id
    );

    res.json(ride);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const endRide = (req, res) => {
  try {
    const ride =
      rideService.endRide(
        req.params.id
      );

    res.json(ride);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getUserRideHistory = (req, res) => {
  try {
    const rides =
      rideService.getUserRideHistory(
        req.params.userId
      );

    res.json(rides);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const getDriverRideHistory = (req, res) => {
  try {
    const rides =
      rideService.getDriverRideHistory(
        req.params.driverId
      );

    res.json(rides);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  bookRide,
  getRide,
  endRide,
  getUserRideHistory,
  getDriverRideHistory,
};
