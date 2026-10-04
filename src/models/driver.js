const createDriver = ({
  id,
  name,
  phone,
  carType,
  latitude,
  longitude,
}) => {
  return {
    id,
    name,
    phone,
    carType,
    location: {
      latitude,
      longitude,
    },

    available: true,
  };
};

module.exports = {
  createDriver,
};