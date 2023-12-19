import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { roleIsUser } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", cartsController.getAllCarts);

router.post("/", cartsController.createcart);

router.get("/:cid", cartsController.getCartById);

router.delete("/:cid", cartsController.cartDelete);

router.post(
  "/:cid/products/:pid",
  roleIsUser,
  cartsController.addProductInCart
);

router.put("/:cid/products/:pid", cartsController.updateProductInCart);

router.delete("/:cid/products/:pid", cartsController.productDeleteInCart);

router.post("/:cid/purchase", cartsController.purchasingProcess);

export default router;
