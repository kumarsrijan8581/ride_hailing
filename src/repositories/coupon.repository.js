const coupons = new Map();

const save = (coupon) => {
  coupons.set(coupon.code, coupon);
  return coupon;
};

const findByCode = (code) => {
  return coupons.get(code);
};

const deleteByCode = (code) => {
  return coupons.delete(code);
};

module.exports = {
  save,
  findByCode,
  deleteByCode,
};