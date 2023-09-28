import { Router } from "express";
import { usersMongo } from "../dao/managers/usersMongo.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, email, age, password } = req.body;
  if (!first_name || !last_name || !username || !email || !age || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersMongo.findUser(username);
  if (userDB) {
    return res.status(400).json({ message: "Username already used" });
  }
  const hashPassword = await hashData(password);
  const newUser = await usersMongo.createUser({
    ...req.body,
    password: hashPassword,
  });
  res.status(200).json({ message: "User created successfully" });
});

//Compare password
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersMongo.findUser(username);
  if (!userDB) {
    return res.status(400).json({ message: "Signup first" });
  }
  const isPasswordValid = await compareData(password, userDB.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Username or Password not valid" });
  }

  // req.session["email"] = email;
  req.session["username"] = username;

  if (userDB.role == "administrator") {
    res.redirect("/api/views/realtimeproducts");
  } else {
    res.redirect("/api/views");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "Error", error: "Error when closing transfer" });
    res.redirect("/login");
  });
});

//passport github
router.get(
  "/githubSignup",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/login/github",
  passport.authenticate("github", {
    failureRedirect: "/register",
    successRedirect: "/api/views",
  })
  // (req, res) => {
  //   console.log(req.user);
  //   res.send("Bienvenido desde Github");
  // }
);

export default router;
