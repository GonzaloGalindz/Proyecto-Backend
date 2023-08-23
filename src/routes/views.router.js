import { Router } from "express";
import productsManager from "../dao/managers/productManager.js";
import { MessagesModel } from "../dao/models/messages.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
