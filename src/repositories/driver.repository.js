const drivers = new Map();

const save = (driver) => {
  drivers.set(driver.id, driver);
  return driver;
};

const findById = (id) => {
  return drivers.get(id);
};

const findAll = () => {
  return [...drivers.values()];
};

const findAvailable = () => {
  return [...drivers.values()].filter(
    (driver) => driver.available
  );
};

const reserveDriver = (driverId) => {
  const driver = drivers.get(driverId);

  if (!driver) {
    return false;
  }

  if (!driver.available) {
    return false;
  }

  // Check + update happen synchronously
  // in the same JavaScript execution.
  driver.available = false;

  drivers.set(driverId, driver);

  return true;
};

const releaseDriver = (driverId) => {
  const driver = drivers.get(driverId);

  if (!driver) {
    return false;
  }

  driver.available = true;

  drivers.set(driverId, driver);

  return true;
};

module.exports = {
  save,
  findById,
  findAll,
  findAvailable,
  reserveDriver,
  releaseDriver,
};