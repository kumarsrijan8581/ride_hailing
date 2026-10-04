const PRICING_CONFIG = {
  HATCHBACK: {
    minimumFare: 50,

    tiers: [
      {
        uptoKm: 2,
        rate: 10,
      },
      {
        uptoKm: 5,
        rate: 8,
      },
      {
        uptoKm: Infinity,
        rate: 5,
      },
    ],
  },

  SEDAN: {
    minimumFare: 70,

    tiers: [
      {
        uptoKm: 2,
        rate: 12,
      },
      {
        uptoKm: 5,
        rate: 10,
      },
      {
        uptoKm: Infinity,
        rate: 7,
      },
    ],
  },
};

module.exports = {
  PRICING_CONFIG,
};