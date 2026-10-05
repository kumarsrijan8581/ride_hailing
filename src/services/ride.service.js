const crypto = require("crypto");

const {
  createRide,
} = require("../models/ride");

const userRepository =
  require("../repositories/user.repository");

const driverRepository =
  require("../repositories/driver.repository");

const rideRepository =
  require("../repositories/ride.repository");

const couponRepository =
  require("../repositories/coupon.repository");

const {
  calculateDistanceKm,
} = require("../utils/distance");

const {
  calculateFare,
} = require("../pricing/pricing.engine");

const createRideService = ({
  matchingStrategy,
  radiusKm = 5,
}) => {

    const findAndReserveDriver = ({
  pickup,
  carType,
}) => {
  const candidates =
    matchingStrategy.findDrivers({
      pickup,
      carType,
      radiusKm,
    });

  for (const candidate of candidates) {
    const reserved =
      driverRepository.reserveDriver(
        candidate.driver.id
      );

    if (reserved) {
      return candidate.driver;
    }
  }

  return null;
};

  const bookRide = ({
    userId,
    pickup,
    drop,
    carType,
    couponCode = null,
  }) => {
    const user =
      userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const userRides = rideRepository.findByUserId(userId);

    const hasOngoingRide = userRides.some((ride) => ride.status === "ONGOING");
    if (hasOngoingRide) {
    throw new Error(
      "User already has an ongoing ride"
    );
  }

    let driver =
  findAndReserveDriver({
    pickup,
    carType,
  });

let actualCarType = carType;

    /*
     * Free Hatchback → Sedan upgrade.
     */
    if (!driver && carType === "HATCHBACK") {
  driver =
    findAndReserveDriver({
      pickup,
      carType: "SEDAN",
    });

  if (driver) {
    actualCarType = "SEDAN";
  }
}

    if (!driver) {
  throw new Error(
    "No driver available within the requested radius"
  );
}


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

  const getUserRideHistory = (userId) => {
  const user = userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return rideRepository.findByUserId(userId);
};

const getDriverRideHistory = (driverId) => {
  const driver = driverRepository.findById(driverId);

  if (!driver) {
    throw new Error("Driver not found");
  }

  return rideRepository.findByDriverId(driverId);
};

  const endRide = (rideId) => {
    const ride =
      rideRepository.findById(rideId);

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "ONGOING") {
      throw new Error(
        "Ride is not ongoing"
      );
    }

    /*
     * Calculate actual distance from
     * pickup to drop.
     */
    const distanceKm =
      calculateDistanceKm(
        ride.pickup,
        ride.drop
      );

    /*
     * Get coupon if one was supplied.
     */
    let coupon = null;

    if (ride.couponCode) {
      coupon =
        couponRepository.findByCode(
          ride.couponCode
        );

      if (!coupon) {
        throw new Error(
          "Coupon is no longer valid"
        );
      }
    }

    /*
     * IMPORTANT:
     *
     * If Sedan was a free upgrade,
     * use requestedCarType for pricing.
     *
     * Otherwise use actualCarType.
     */
    const pricingCarType =
      ride.requestedCarType !==
      ride.actualCarType
        ? ride.requestedCarType
        : ride.actualCarType;

    const fare = calculateFare({
      distanceKm,
      carType: pricingCarType,
      coupon,
    });

    ride.status = "COMPLETED";

    ride.distanceKm = distanceKm;

    ride.fare = fare;

    ride.completedAt = new Date();

    /*
     * Driver becomes available again.
     */
    driverRepository.releaseDriver(
  ride.driverId
);

return rideRepository.save(ride);
  };

  const getRide = (rideId) => {
    const ride =
      rideRepository.findById(rideId);

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  };

  return {
  bookRide,
  endRide,
  getRide,
  getUserRideHistory,
  getDriverRideHistory,
};
};

module.exports = {
  createRideService,
};