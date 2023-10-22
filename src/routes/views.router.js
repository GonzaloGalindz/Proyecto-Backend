import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";

const router = Router();

router.get("/", viewsController.homeRender);

router.get("/realtimeproducts", viewsController.realTimeProductsRender);

router.get("/login", viewsController.loginRender);

router.get("/signUp", viewsController.signUpRender);

// router.get("/adminHome", viewsController.adminHomeRender);

router.get("/clientHome", viewsController.clientHomeRender);

// router.get("/chat", (req, res) => {
//   res.render("chat");
// });

export default router;
