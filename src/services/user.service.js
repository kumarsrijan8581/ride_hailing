const crypto = require("crypto");

const { createUser } = require("../models/user");
const userRepository = require("../repositories/user.repository");

const registerUser = ({ name, phone }) => {
  if (!name || !phone) {
    throw new Error("Name and phone are required");
  }

  const user = createUser({
    id: crypto.randomUUID(),
    name,
    phone,
  });

  return userRepository.save(user);
};

const getUser = (id) => {
  const user = userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  registerUser,
  getUser,
};