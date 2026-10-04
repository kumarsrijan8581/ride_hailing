const rides = new Map();

const save = (ride) => {
  rides.set(ride.id, ride);
  return ride;
};

const findById = (id) => {
  return rides.get(id);
};

const findByUserId = (userId) => {
  return [...rides.values()].filter(
    (ride) => ride.userId === userId
  );
};

const findByDriverId = (driverId) => {
  return [...rides.values()].filter(
    (ride) => ride.driverId === driverId
  );
};

module.exports = {
  save,
  findById,
  findByUserId,
  findByDriverId,
};