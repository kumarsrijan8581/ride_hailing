const express = require("express");

const {
  addCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controller");

const router = express.Router();

router.post("/", addCoupon);

router.delete("/:code", deleteCoupon);

module.exports = router;