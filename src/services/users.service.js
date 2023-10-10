import { usersMongo } from "../DAL/DAOs/MongoDAOs/users.dao.js";

export const findUser = async (username) => {
  const users = await usersMongo.findUser({ username });
  return users;
};

export const create = async (user) => {
  const newUser = await usersMongo.create(user);
  return newUser;
};

export const deleteUser = async (username) => {
  const response = await usersMongo.deleteUser({ username });
  return response;
};
