import { Router } from "express";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  productDelete,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCarts);

router.get("/:cid", getCartById);

router.post("/", createCart);

router.put("/:cid", updateCart);

router.delete("/:cid", deleteCart);

router.delete("/:cid/products/:pid", productDelete);

export default router;
