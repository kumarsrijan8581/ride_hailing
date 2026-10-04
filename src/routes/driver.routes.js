const express = require("express");

const {
  registerDriver,
  updateLocation,
} = require("../controllers/driver.controller");

const router = express.Router();

router.post("/", registerDriver);

router.patch("/:id/location", updateLocation);

module.exports = router;