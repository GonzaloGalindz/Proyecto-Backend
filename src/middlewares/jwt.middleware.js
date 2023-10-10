import jwt from "jsonwebtoken";
import config from "../config.js";

// // sin cookies
// export const jwtValidation = (req, res, next) => {
//   try {
//     const authHeader = req.get("Authorization");
//     const token = authHeader.split(" ")[1];
//     const response = jwt.verify(token, config.jwt_secret_key);
//     req.user = response.user;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

//con cookies
export const jwtValidation = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const response = jwt.verify(token, config.jwt_secret_key);
    req.user = response.user;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
