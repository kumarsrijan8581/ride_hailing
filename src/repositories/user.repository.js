const users = new Map();

const save = (user) => {
  users.set(user.id, user);
  return user;
};

const findById = (id) => {
  return users.get(id);
};

const findAll = () => {
  return [...users.values()];
};

module.exports = {
  save,
  findById,
  findAll,
};