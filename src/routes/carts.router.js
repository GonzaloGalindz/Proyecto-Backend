import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.getAllCarts);

router.post("/", cartsController.createcart);

router.get("/:cid", cartsController.getCartById);

router.delete("/:cid", cartsController.cartDelete);

router.post("/:cid/products/:pid", cartsController.addProduct);

router.put("/:cid/products/:pid", cartsController.updateProduct);

router.delete("/:cid/products/:pid", cartsController.productDelete);

export default router;
