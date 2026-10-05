const couponService =
  require("../services/coupon.service");

const addCoupon = (req, res) => {
  try {
    const coupon =
      couponService.addCoupon(req.body);

    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteCoupon = (req, res) => {
  try {
    couponService.deleteCoupon(
      req.params.code
    );

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  addCoupon,
  deleteCoupon,
};