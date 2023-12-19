import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { roleIsAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", productsController.getProducts);

router.get("/:pid", productsController.getProductById);

router.post("/", roleIsAdmin, productsController.addProduct);

router.put("/:pid", roleIsAdmin, productsController.updateProduct);

router.delete("/:pid", roleIsAdmin, productsController.productDelete);

export default router;
