const driverRepository = require("../repositories/driver.repository");

const {
  createNearestDriverStrategy,
} = require("../matching/nearest-driver.strategy");

const {
  createRideService,
} = require("./ride.service");

const nearestDriverStrategy =
  createNearestDriverStrategy({
    driverRepository,
  });

const rideService = createRideService({
  matchingStrategy: nearestDriverStrategy,
  radiusKm: 5,
});

module.exports = {
  rideService,
};