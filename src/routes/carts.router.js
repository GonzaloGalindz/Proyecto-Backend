import { Router } from "express";
import cartsManager from "../cartManager.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.getCart(+cid);
    res.status(200).json({ msg: "Cart", cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.status(200).json({ msg: "New Cart", newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const addProduct = await cartsManager.addProductInCart();
    res.status(200).json({ msg: "Products in this cart", addProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
