const {
  calculateDistanceKm,
} = require("../utils/distance");

const createNearestDriverStrategy = ({
  driverRepository,
}) => {
  const findDrivers = ({
    pickup,
    carType,
    radiusKm,
  }) => {
    return driverRepository
      .findAvailable()
      .filter((driver) => {
        return driver.carType === carType;
      })
      .map((driver) => ({
        driver,

        distanceKm:
          calculateDistanceKm(
            pickup,
            driver.location
          ),
      }))
      .filter(({ distanceKm }) => {
        return distanceKm <= radiusKm;
      })
      .sort((a, b) => {
        return (
          a.distanceKm -
          b.distanceKm
        );
      });
  };

  return {
    findDrivers,
  };
};

module.exports = {
  createNearestDriverStrategy,
};