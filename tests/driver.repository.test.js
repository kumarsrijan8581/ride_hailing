const driverRepository = require(
  "../src/repositories/driver.repository"
);

describe("Driver reservation", () => {
  test("only one reservation succeeds", () => {
    const driver = {
      id: "driver-1",

      name: "Rahul",

      phone: "9999999999",

      carType: "HATCHBACK",

      location: {
        latitude: 12.9716,
        longitude: 77.5946,
      },

      available: true,
    };

    driverRepository.save(driver);

    const firstReservation =
      driverRepository.reserveDriver(
        "driver-1"
      );

    const secondReservation =
      driverRepository.reserveDriver(
        "driver-1"
      );

    expect(firstReservation).toBe(true);

    expect(secondReservation).toBe(false);

    expect(
      driverRepository.findById(
        "driver-1"
      ).available
    ).toBe(false);
  });
});