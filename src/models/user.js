const createUser = ({ id, name, phone }) => {
  return {
    id,
    name,
    phone,
  };
};

module.exports = {
  createUser,
};