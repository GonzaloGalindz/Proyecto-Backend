import { usersModel } from "../../MongoDB/models/users.model.js";
import BasicMongo from "./BasicMongo.js";

class UsersMongo extends BasicMongo {
  constructor() {
    super(usersModel);
  }

  async findUser(username) {
    try {
      const user = await usersModel.findOne({ username });
      return user;
    } catch (error) {
      return error;
    }
  }
}

export const usersMongo = new UsersMongo();
