# Ride Hailing Service Backend

A backend implementation of a ride-hailing service built using **Node.js** and **Express.js**.

The application provides REST APIs for user and driver registration, driver matching, ride booking, fare calculation, coupons, ride completion, location updates, and ride history.

The application currently uses **in-memory storage** using JavaScript `Map` objects, as allowed by the assignment.

---

## Tech Stack

- Node.js
- Express.js
- Jest
- JavaScript
- In-memory repositories using `Map`
- REST APIs

---

## Features

### Mandatory Features

- User registration
- Driver registration
- Driver location updates
- Ride booking
- Nearest driver matching
- Configurable matching radius
- Hatchback and Sedan support
- Free Hatchback → Sedan upgrade
- Tiered fare calculation
- Minimum fare
- Coupon support
  - Percentage discount
  - Flat discount
- Ride completion
- User ride history
- Driver ride history
- Automated pricing tests
- Driver reservation to prevent the same driver from being assigned to multiple rides

### Bonus / Extensibility

The design allows additional features such as:

- Surge pricing
- Alternative driver matching strategies
- Ride cancellation
- More sophisticated concurrency handling
- Persistent database storage

---

# Project Structure

```text
ride-hailing/
│
├── server.js
├── package.json
├── README.md
│
├── src/
│   ├── app.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── driver.routes.js
│   │   ├── ride.routes.js
│   │   └── coupon.routes.js
│   │
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── driver.controller.js
│   │   ├── ride.controller.js
│   │   └── coupon.controller.js
│   │
│   ├── services/
│   │   ├── user.service.js
│   │   ├── driver.service.js
│   │   ├── ride.service.js
│   │   ├── coupon.service.js
│   │   └── index.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── driver.repository.js
│   │   ├── ride.repository.js
│   │   └── coupon.repository.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── driver.js
│   │   ├── ride.js
│   │   └── coupon.js
│   │
│   ├── pricing/
│   │   ├── pricing.config.js
│   │   └── pricing.engine.js
│   │
│   ├── matching/
│   │   └── nearest-driver.strategy.js
│   │
│   └── utils/
│       └── distance.js
│
└── tests/
    ├── pricing.engine.test.js
    └── driver.repository.test.js
