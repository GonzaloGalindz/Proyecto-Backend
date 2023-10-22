import { usersModel } from "../../MongoDB/models/users.model.js";
import BasicMongo from "./BasicMongo.js";

class UsersMongo extends BasicMongo {
  constructor() {
    super(usersModel);
  }

  async findUser(username) {
    const user = await usersModel.findOne({ username });
    if (!user) throw new Error("User not found");
    return user;
  }
}

export const usersMongo = new UsersMongo();
