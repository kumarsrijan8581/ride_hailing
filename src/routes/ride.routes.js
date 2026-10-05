const express = require("express");

const {
  bookRide,
  getRide,
  endRide,
  getUserRideHistory,
    getDriverRideHistory,
} = require("../controllers/ride.controller");


const router = express.Router();

router.post("/", bookRide);

router.post("/:id/end", endRide);

router.get(
  "/users/:userId/history",
  getUserRideHistory
);

router.get(
  "/drivers/:driverId/history",
  getDriverRideHistory
);

router.get("/:id", getRide);

module.exports = router;