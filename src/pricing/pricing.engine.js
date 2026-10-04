const { PRICING_CONFIG } = require("./pricing.config");

const calculateTieredFare = (distanceKm, tiers) => {
  let remainingDistance = distanceKm;
  let previousLimit = 0;
  let fare = 0;

  for (const tier of tiers) {
    if (remainingDistance <= 0) {
      break;
    }

    const tierDistance =
      Math.min(distanceKm, tier.uptoKm) - previousLimit;

    if (tierDistance > 0) {
      fare += tierDistance * tier.rate;
    }

    previousLimit = tier.uptoKm;
  }

  return fare;
};

const calculateFare = ({
  distanceKm,
  requestedCarType,
  actualCarType,
  coupon = null,
}) => {
  if (distanceKm < 0) {
    throw new Error("Distance cannot be negative");
  }

  const requestedPricing = PRICING_CONFIG[requestedCarType];

  if (!requestedPricing) {
    throw new Error(`Unsupported car type: ${requestedCarType}`);
  }

  /*
   * If the user requested a Hatchback but received a Sedan,
   * it is a free upgrade.
   *
   * Therefore, use the requested car type for pricing.
   */
  const pricing = PRICING_CONFIG[requestedCarType];

  let fare = calculateTieredFare(distanceKm, pricing.tiers);

  fare = Math.max(fare, pricing.minimumFare);

  if (coupon) {
    fare = applyCoupon(fare, coupon);
  }

  return Math.max(0, fare);
};

const applyCoupon = (fare, coupon) => {
  if (coupon.type === "PERCENTAGE") {
    return fare - (fare * coupon.value) / 100;
  }

  if (coupon.type === "FLAT") {
    return fare - coupon.value;
  }

  throw new Error(`Unsupported coupon type: ${coupon.type}`);
};

module.exports = {
  calculateFare,
};