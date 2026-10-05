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

module.exports = {
  bookRide,
  getRide,
};