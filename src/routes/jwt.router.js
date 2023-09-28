import { Router } from "express";
import { usersMongo } from "../dao/managers/usersMongo.js";
import { generateToken, compareData } from "../utils.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";

const router = Router();

// //sin cookies
// router.post("/", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     if (!username || !password) {
//       return res.status(400).json({ message: "Some data is missing" });
//     }
//     const userDB = await usersMongo.findUser(username);
//     if (!userDB) {
//       return res.status(400).json({ message: "Signup first" });
//     }
//     const isPasswordValid = await compareData(password, userDB.password);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ message: "Username or Password not valid" });
//     }
//     console.log("probando");

//     const token = generateToken(userDB);
//     console.log("token", token);
//     res.status(200).json({ message: "Token generated", token });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

//con cookies
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    const userDB = await usersMongo.findUser(username);
    if (!userDB) {
      return res.status(400).json({ message: "Signup first" });
    }
    console.log(username);
    const isPasswordValid = await compareData(password, userDB.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or Password not valid" });
    }

    const token = generateToken(userDB);
    console.log("token", token);
    res.status(200).json({ message: "Token generated", token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get(
  "/validation",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Validation", user: req.user });
  }
);

export default router;
