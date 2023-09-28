import Router from "./customRouter.js";
import { usersMongo } from "../dao/managers/usersMongo.js";

class UsersRouter extends Router {
  init() {
    this.get("/:username", async (req, res) => {
      const { username } = req.params;
      try {
        const user = await usersMongo.findUser(username);
        if (!user) return res.errorResponse("User not found");
        res.successResponse("User found", user);
      } catch (error) {
        res.serverError();
      }
    });

    this.delete("/:username", async (req, res) => {
      const { username } = req.params;
      try {
        const user = await usersMongo.deleteUser(username);
        if (!user) return res.status(400).errorResponse("User not found");
        res.successResponse("User found", user);
      } catch (error) {
        res.serverError();
      }
    });
  }
}

export const usersCustomRouter = new UsersRouter();
