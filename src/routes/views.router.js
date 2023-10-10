import { Router } from "express";
import {
  viewHome,
  viewRealTime,
  login,
  register,
  logOutUser,
} from "../controllers/views.controller.js";
import passport from "passport";
// import { MessagesModel } from "../dao/models/messages.model.js";

const router = Router();

router.get("/", viewHome);

router.get("/realtimeproducts", viewRealTime);

router.get("/login", login);

router.get("/register", register);

router.get("/logout", logOutUser);

router.get(
  "/githubSignup",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/login/github",
  passport.authenticate("github", {
    failureRedirect: "/api/views/register",
    successRedirect: "/api/views",
  })
);

// router.get("/chat", (req, res) => {
//   res.render("chat");
// });

export default router;
