import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.getAllCarts);

router.post("/", cartsController.createcart);

router.get("/:cid", cartsController.getCartById);

router.delete("/:cid", cartsController.cartDelete);

router.post("/:cid/products/:pid", cartsController.addProductInCart);

router.put("/:cid/products/:pid", cartsController.updateProductInCart);

router.delete("/:cid/products/:pid", cartsController.productDeleteInCart);

export default router;
