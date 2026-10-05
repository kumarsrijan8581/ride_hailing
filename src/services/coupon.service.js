const {
  createCoupon,
} = require("../models/coupon");

const couponRepository =
  require("../repositories/coupon.repository");

const addCoupon = ({
  code,
  type,
  value,
}) => {
  if (!code || !type || value == null) {
    throw new Error(
      "Code, type and value are required"
    );
  }

  if (!["PERCENTAGE", "FLAT"].includes(type)) {
    throw new Error(
      "Invalid coupon type"
    );
  }

  if (value <= 0) {
    throw new Error(
      "Coupon value must be positive"
    );
  }

  const existingCoupon =
    couponRepository.findByCode(code);

  if (existingCoupon) {
    throw new Error(
      "Coupon already exists"
    );
  }

  const coupon = createCoupon({
    code,
    type,
    value,
  });

  return couponRepository.save(coupon);
};

const deleteCoupon = (code) => {
  const deleted =
    couponRepository.deleteByCode(code);

  if (!deleted) {
    throw new Error(
      "Coupon not found"
    );
  }
};

module.exports = {
  addCoupon,
  deleteCoupon,
};