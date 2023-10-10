import { findProducts } from "../services/products.service.js";
import { findUser, create } from "../services/users.service.js";
import { compareData, hashData } from "../utils.js";

export const viewHome = async (req, res) => {
  const products = findProducts();
  const plainProducts = products.map((product) => product.toObject());
  res.render("home", { products: plainProducts });
};

export const viewRealTime = async (req, res) => {
  const products = findProducts();
  const plainProducts = products.map((product) => product.toObject());
  res.render("realTimeProducts", { products: plainProducts });
};

export const loginRender = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = findUser(username);
  if (!userDB) {
    return res.status(400).json({ message: "Signup first" });
  }
  const isPasswordValid = await compareData(password, userDB.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Username or Password not valid" });
  }

  req.session["username"] = username;

  if (userDB.role == "admin") {
    res.redirect("/api/views/realtimeproducts");
  } else {
    res.redirect("/api/views");
  }
};

export const registerRender = async (req, res) => {
  const { first_name, last_name, username, email, age, password } = req.body;
  if (!first_name || !last_name || !username || !email || !age || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = findUser(username);
  if (userDB) {
    return res.status(400).json({ message: "Username already used" });
  }
  const hashPassword = await hashData(password);
  const newUser = create({
    ...req.body,
    password: hashPassword,
  });
  res.status(200).json({ message: "User created successfully" });
};

export const login = (req, res) => {
  res.render("login");
};

export const register = (req, res) => {
  res.render("register");
};

export const logOutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "Error", error: "Error when closing transfer" });
    res.redirect("/login");
  });
};
