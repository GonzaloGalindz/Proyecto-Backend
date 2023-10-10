import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { existsUser, deletedUser } from "../controllers/users.controller.js";
import {
  registerRender,
  loginRender,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", existsUser);

router.post("/register", registerRender);

router.post("/login", loginRender);

router.get(
  "/:username",
  jwtValidation,
  authMiddleware(["prime", "admin"]),
  async (req, res) => {
    const { username } = req.params;
    try {
      const user = existsUser(username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:username",
  jwtValidation,
  authMiddleware(["admin"]),
  async (req, res) => {
    const { username } = req.params;
    try {
      const user = deletedUser(username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.param("username", (req, res, next, username) => {
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }
  next();
});

export default router;
