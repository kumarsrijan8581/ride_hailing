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

module.exports = {
  save,
  findById,
  findAll,
  findAvailable,
};