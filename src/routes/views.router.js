import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";
import { usersController } from "../controllers/users.controller.js";

const router = Router();

router.get("/", viewsController.homeRender);

router.get("/realtimeproducts", viewsController.realTimeProductsRender);

router.get("/login", viewsController.loginRender);

router.post("/login", usersController.logInUser);

router.get("/signUp", viewsController.signUpRender);

router.post("/signUp", usersController.signUpUser);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ error: "Could not log out" });
    res.redirect("/login");
  });
});

// router.get("/adminHome", viewsController.adminHomeRender);

router.get("/clientHome", viewsController.clientHomeRender);

export default router;
