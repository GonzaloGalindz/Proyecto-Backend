import { productsService } from "../services/products.service.js";

class ViewsController {
  async homeRender(req, res) {
    const allProducts = await productsService.getProducts();
    res.render("home", { products: allProducts });
  }

  async realTimeProductsRender(req, res) {
    const allProducts = await productsService.getProducts();
    res.render("realTimeProducts", { products: allProducts });
  }

  loginRender(req, res) {
    res.render("login");
  }

  signUpRender(req, res) {
    res.render("signUp");
  }

  //   adminHomeRender(req, res) {
  //     res.render("adminHome");
  //   }

  clientHomeRender(req, res) {
    res.render("client");
  }
}

export const viewsController = new ViewsController();
