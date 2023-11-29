import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.getAllCarts);

router.post("/", cartsController.createcart);

router.get("/:cid", cartsController.getCartById);

router.delete("/:cid", cartsController.cartDelete);

//Crea nuevos ids
router.post("/:cid/products/:pid", cartsController.addProductInCart);

//Me actualiza cantidad de producto y me lo crea con nuevo id
router.put("/:cid/products/:pid", cartsController.updateProductInCart);

//Me sale que lo borra correctamente, pero no lo borra y tiene un nuevo id
router.delete("/:cid/products/:pid", cartsController.productDeleteInCart);

export default router;
