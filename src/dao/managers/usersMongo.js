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

  async findUser(data) {
    try {
      const user = await usersModel.findOne(data);
      return user;
    } catch (error) {
      return error;
    }
  }

  // async findUserByUsername(username) {
  //   try {
  //     const user = await usersModel.findOne({ username });
  //     return user;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

export const usersMongo = new UsersMongo();
