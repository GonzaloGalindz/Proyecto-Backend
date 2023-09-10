import { Router } from "express";
import { usersMongo } from "../dao/managers/usersMongo.js";
import { hashData, compareData } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersMongo.findUser(email);
  if (userDB) {
    return res.status(400).json({ message: "Email already used" });
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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersMongo.findUser(email);
  if (!userDB) {
    return res.status(400).json({ message: "Signup first" });
  }
  const isPasswordValid = await compareData(password, userDB.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or Password not valid" });
  }

  req.session["email"] = email;

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

export default router;
