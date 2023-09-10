import { Router } from "express";
import { productsMongo } from "../dao/managers/productsMongo.js";
// import { MessagesModel } from "../dao/models/messages.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsMongo.findProducts();
  const plainProducts = products.map((product) => product.toObject());
  res.render("home", { products: plainProducts });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsMongo.findProducts();
  const plainProducts = products.map((product) => product.toObject());
  res.render("realTimeProducts", { products: plainProducts });
});

// router.get("/chat", (req, res) => {
//   res.render("chat");
// });

export default router;
