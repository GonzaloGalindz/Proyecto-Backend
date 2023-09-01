import { Router } from "express";
import { productsMongo } from "../dao/managers/productsMongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.findAll(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productsMongo.findById(pid);
    if (!prod) {
      res.status(400).json({ msg: "No product ID found" });
    } else {
      res.status(200).json({ msg: "Product", prod });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { name, price, stock, code, description } = req.body;
  if (!name || !price || !stock || !code || !description) {
    res.status(400).json({ msg: "Some data is missing" });
  }
  try {
    const newProduct = await productsMongo.createOne(req.body);
    res.status(200).json({ msg: "New Product", newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prodUpdated = await productsMongo.updateone(pid, req.body);
    res.status(200).json({ msg: "Product updated", prodUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productsMongo.deleteOne(pid);
    res.status(200).json({ msg: "Product deleted", deletedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
