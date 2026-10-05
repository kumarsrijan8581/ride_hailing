const {
  calculateDistanceKm,
} = require("../utils/distance");

const createNearestDriverStrategy = ({
  driverRepository,
}) => {
  const findDriver = ({
    pickup,
    carType,
    radiusKm,
  }) => {
    const drivers = driverRepository.findAvailable();

    const matchingDrivers = drivers
      .filter((driver) => {
        return driver.carType === carType;
      })
      .map((driver) => ({
        driver,
        distanceKm: calculateDistanceKm(
          pickup,
          driver.location
        ),
      }))
      .filter(({ distanceKm }) => {
        return distanceKm <= radiusKm;
      })
      .sort((a, b) => {
        return a.distanceKm - b.distanceKm;
      });

    return matchingDrivers[0] || null;
  };

  return {
    findDriver,
  };
};

module.exports = {
  createNearestDriverStrategy,
};