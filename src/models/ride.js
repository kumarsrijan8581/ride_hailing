const createRide = ({
  id,
  userId,
  driverId,
  requestedCarType,
  actualCarType,
  pickup,
  drop,
  couponCode = null,
}) => {
  return {
    id,
    userId,
    driverId,
    requestedCarType,
    actualCarType,
    pickup,
    drop,
    couponCode,
    status: "ONGOING",
    distanceKm: null,
    fare: null,
    startedAt: new Date(),
    completedAt: null,
  };
};

module.exports = {
  createRide,
};