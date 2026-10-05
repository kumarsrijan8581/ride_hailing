const { PRICING_CONFIG } = require("./pricing.config");

const calculateTieredFare = (distanceKm, tiers) => {
  let fare = 0;
  let previousLimit = 0;

  for (const tier of tiers) {
    if (distanceKm <= previousLimit) {
      break;
    }

    const tierDistance =
      Math.min(distanceKm, tier.uptoKm) - previousLimit;

    fare += tierDistance * tier.rate;

    previousLimit = tier.uptoKm;
  }

  return fare;
};

const applyCoupon = (fare, coupon) => {
  if (coupon.type === "PERCENTAGE") {
    return fare - (fare * coupon.value) / 100;
  }

  if (coupon.type === "FLAT") {
    return fare - coupon.value;
  }

  throw new Error(
    `Unsupported coupon type: ${coupon.type}`
  );
};

const calculateFare = ({
  distanceKm,
  carType,
  coupon = null,
}) => {
  if (distanceKm < 0) {
    throw new Error("Distance cannot be negative");
  }

  const pricing = PRICING_CONFIG[carType];

  if (!pricing) {
    throw new Error(
      `Unsupported car type: ${carType}`
    );
  }

  let fare = calculateTieredFare(
    distanceKm,
    pricing.tiers
  );

  fare = Math.max(
    fare,
    pricing.minimumFare
  );

  if (coupon) {
    fare = applyCoupon(fare, coupon);
  }

  return Math.max(0, fare);
};

module.exports = {
  calculateFare,
};