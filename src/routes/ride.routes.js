const express = require("express");

const {
  bookRide,
  getRide,
} = require("../controllers/ride.controller");

const router = express.Router();

router.post("/", bookRide);

router.get("/:id", getRide);

module.exports = router;