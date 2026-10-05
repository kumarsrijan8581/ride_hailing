const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const calculateDistanceKm = (pointA, pointB) => {
  const EARTH_RADIUS_KM = 6371;

  const lat1 = toRadians(pointA.latitude);
  const lat2 = toRadians(pointB.latitude);

  const deltaLat = toRadians(
    pointB.latitude - pointA.latitude
  );

  const deltaLon = toRadians(
    pointB.longitude - pointA.longitude
  );

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return EARTH_RADIUS_KM * c;
};

module.exports = {
  calculateDistanceKm,
};