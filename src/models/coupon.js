const createCoupon = ({
  code,
  type,
  value,
}) => {
  return {
    code,
    type,
    value,
  };
};

module.exports = {
  createCoupon,
};