import { Router } from "express";
import passport from "passport";
import UsersDto from "../DAL/DTOs/users.dto.js";

const router = Router();

// router.get(
//   "/githubSignup",
//   passport.authenticate("github", { scope: ["user:email"] })
// );

// router.get(
//   "/github",
//   passport.authenticate("github", { failureRedirect: "/api/views/signUp" }),
//   (req, res) => {
//     req.session["username"] = req.user.username;
//     res.redirect("/current");
//   }
// );

router.get("/current", (req, res) => {
  const dtoUser = new UsersDto(req.session.user);
  res.status(200).json({ user: dtoUser });
});

export default router;
