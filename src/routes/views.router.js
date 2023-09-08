import { Router } from "express";
import { productsMongo } from "../dao/managers/productsMongo.js";
// import { MessagesModel } from "../dao/models/messages.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsMongo.findProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsMongo.findProducts();
  res.render("realTimeProducts", { products });
});

// router.get("/chat", (req, res) => {
//   res.render("chat");
// });

export default router;
