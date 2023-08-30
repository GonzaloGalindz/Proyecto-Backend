import { Router } from "express";
import { cartsMongo } from "../Dao/Managers/cartsMongo.js";
// import cartsManager from "../cartManager.js";

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
    res.status(200).json({ msg: "Cart", cart });
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
    const cartUpdated = await cartsMongo.updateone(cid, req.body);
    res.status(200).json({ msg: "Cart updated", cartUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    //
    res.status(200).json({ msg: "Cart updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartsMongo.deleteOne(cid);
    res.status(200).json({ msg: "Cart deleted", deletedCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsMongo.deleteProductInCart(cid, pid);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.post("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const addProduct = await cartsManager.addProductInCart(+cid, +pid);
//     res.status(200).json({ msg: "Products in this cart", addProduct });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

export default router;
