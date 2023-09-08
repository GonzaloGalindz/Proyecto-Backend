import { usersModel } from "../models/users.model.js";

class UsersMongo {
  async createUser(user) {
    try {
      const newUser = await usersModel.create(user);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async findUser(email) {
    try {
      const user = await usersModel.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserRole(role) {
    try {
      const user = await usersModel.findOne({ role });
      return user;
    } catch (error) {
      return error;
    }
  }
}

export const usersMongo = new UsersMongo();
