const crypto = require("crypto");

const { createDriver } = require("../models/driver");
const driverRepository = require("../repositories/driver.repository");

const registerDriver = ({
  name,
  phone,
  carType,
  latitude,
  longitude,
}) => {
  if (!name || !phone || !carType) {
    throw new Error("Name, phone and car type are required");
  }

  if (!["HATCHBACK", "SEDAN"].includes(carType)) {
    throw new Error("Invalid car type");
  }

  const driver = createDriver({
    id: crypto.randomUUID(),
    name,
    phone,
    carType,
    latitude,
    longitude,
  });

  return driverRepository.save(driver);
};

const updateLocation = (driverId, latitude, longitude) => {
  const driver = driverRepository.findById(driverId);

  if (!driver) {
    throw new Error("Driver not found");
  }

  driver.location = {
    latitude,
    longitude,
  };

  return driverRepository.save(driver);
};

const getDriver = (driverId) => {
  const driver = driverRepository.findById(driverId);

  if (!driver) {
    throw new Error("Driver not found");
  }

  return driver;
};

module.exports = {
  registerDriver,
  updateLocation,
  getDriver,
};