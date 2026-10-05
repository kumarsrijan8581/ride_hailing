const { calculateFare } = require("../src/pricing/pricing.engine");

describe("Pricing Engine", () => {
  test("calculates fare for first 2 km", () => {
    const fare = calculateFare({
      distanceKm: 2,
      requestedCarType: "HATCHBACK",
      actualCarType: "HATCHBACK",
    });

    expect(fare).toBe(50);
  });

  test("applies minimum fare", () => {
    const fare = calculateFare({
      distanceKm: 1,
      requestedCarType: "HATCHBACK",
      actualCarType: "HATCHBACK",
    });

    expect(fare).toBe(50);
  });

  test("calculates progressive tier pricing", () => {
    const fare = calculateFare({
      distanceKm: 7,
      requestedCarType: "HATCHBACK",
      actualCarType: "HATCHBACK",
    });

    expect(fare).toBe(54);
  });

  test("uses different pricing for sedan", () => {
    const fare = calculateFare({
      distanceKm: 7,
      requestedCarType: "SEDAN",
      actualCarType: "SEDAN",
    });

    expect(fare).toBe(70);
  });

  test("charges hatchback price when upgraded to sedan", () => {
  const fare = calculateFare({
    distanceKm: 7,
    carType: "HATCHBACK",
  });

  expect(fare).toBe(54);
});

  test("applies percentage coupon", () => {
    const fare = calculateFare({
      distanceKm: 7,
      requestedCarType: "HATCHBACK",
      actualCarType: "HATCHBACK",
      coupon: {
        type: "PERCENTAGE",
        value: 10,
      },
    });

    expect(fare).toBe(48.6);
  });

  test("applies flat coupon", () => {
    const fare = calculateFare({
      distanceKm: 7,
      requestedCarType: "HATCHBACK",
      actualCarType: "HATCHBACK",
      coupon: {
        type: "FLAT",
        value: 20,
      },
    });

    expect(fare).toBe(34);
  });
});