import { Router } from "express";
import { cartsMongo } from "../dao/managers/cartsMongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsMongo.findAll();
    res.status(200).json({ msg: "All carts", carts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsMongo.findById(cid);
    res.status(200).json({ msg: "Cart by Id", cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ msg: "Some data is missing" });
  }
  try {
    const newCart = await cartsMongo.createOne(req.body);
    res.status(200).json({ msg: "New Cart", newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartUpdated = await cartsMongo.updateOne(cid, req.body);
    res.status(200).json({ msg: "Cart updated", cartUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newQuantity = req.body.quantity;
  try {
    const cart = await cartsMongo.updateProductInCart(cid, pid, newQuantity);
    if (!cart) {
      return res.status(400).json({ error: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.put("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const cart = await cartsMongo.updateProductInCart(cid, pid, req.body);
//     res.status(200).json({ msg: "Cart and products updated", cart });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartsMongo.deleteOne(cid);
    res.status(200).json({ msg: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsMongo.deleteProductInCart(cid, pid);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
