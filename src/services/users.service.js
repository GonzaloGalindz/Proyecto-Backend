import { usersMongo } from "../DAL/DAOs/MongoDAOs/users.dao.js";
import { hashData, compareData } from ".././utils.js";

class UsersService {
  async findUser(username) {
    const user = await usersMongo.findUser({ username });
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(user) {
    const adminEmail = "adminCoder@coder.com";
    const { first_name, last_name, username, password, email } = user;
    const userDB = await usersMongo.findUser(username);
    if (!first_name || !last_name || !username || !password || !email)
      throw new Error("Some required data is missing");
    if (userDB) throw new Error("This user already exists");
    const hashedPassword = await hashData(password);
    if (adminEmail === user.email) {
      user.role = "admin";
      const newUser = await usersMongo.createOne(user, {
        password: hashedPassword,
      });
      return newUser;
    } else {
      const newUser = await usersMongo.createOne(user, {
        password: hashedPassword,
      });
      return newUser;
    }
  }

  async findUserLogin(username, password) {
    if (!username || !password) throw new Error("Some data is missing");
    const userLogin = await usersMongo.findUser({ username });
    if (!userLogin) throw new Error("Sign up first");
    const isPasswordValid = await compareData(password, userLogin.password);
    if (!isPasswordValid) throw new Error("Username or Password not valid");
    return userLogin;
  }
}

export const userService = new UsersService();
