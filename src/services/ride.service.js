const crypto = require("crypto");

const {
  createRide,
} = require("../models/ride");

const userRepository = require("../repositories/user.repository");
const driverRepository = require("../repositories/driver.repository");
const rideRepository = require("../repositories/ride.repository");

const createRideService = ({
  matchingStrategy,
  radiusKm = 5,
}) => {
  const bookRide = ({
    userId,
    pickup,
    drop,
    carType,
    couponCode = null,
  }) => {
    const user = userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    /*
     * First try the requested car type.
     */
    let match = matchingStrategy.findDriver({
      pickup,
      carType,
      radiusKm,
    });

    let actualCarType = carType;

    /*
     * Mandatory free upgrade:
     * Hatchback → Sedan if Hatchback unavailable.
     */
    if (!match && carType === "HATCHBACK") {
      match = matchingStrategy.findDriver({
        pickup,
        carType: "SEDAN",
        radiusKm,
      });

      if (match) {
        actualCarType = "SEDAN";
      }
    }

    if (!match) {
      throw new Error(
        "No driver available within the requested radius"
      );
    }

    const driver = match.driver;

    /*
     * Mark driver unavailable immediately after assignment.
     */
    driver.available = false;

    driverRepository.save(driver);

    const ride = createRide({
      id: crypto.randomUUID(),

      userId,

      driverId: driver.id,

      requestedCarType: carType,

      actualCarType,

      pickup,

      drop,

      couponCode,
    });

    return rideRepository.save(ride);
  };

  const getRide = (rideId) => {
    const ride = rideRepository.findById(rideId);

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  };

  return {
    bookRide,
    getRide,
  };
};

module.exports = {
  createRideService,
};