import { cartsService } from "../services/carts.service.js";
import CustomError from "../errors/custom.error.js";
import { ErrorMessages } from "../errors/errorNum.js";

class CartsController {
  async createcart(req, res) {
    const dataCart = req.body;
    try {
      const newCart = await cartsService.createCart(dataCart);
      res
        .status(200)
        .json({ message: "Cart created successfully", cart: newCart });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async addProduct(req, res) {
    const { cid, pid } = req.params;
    try {
      const newProduct = await cartsService.addProduct(cid, pid);
      res
        .status(200)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async productDelete(req, res) {
    const { cid, pid } = req.params;
    try {
      const productDeleted = await cartsService.productDelete(cid, pid);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.DELETE_PRODUCT_FROM_CART_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }

  async getCart(req, res) {
    const { cid } = req.params;
    try {
      const cartById = await cartsService.getCartById(cid);
      res.status(200).json({ message: "This is your cart", cart: cartById });
    } catch (error) {
      const customError = CustomError.createError(ErrorMessages.CART_NOT_FOUND);
      res.status(customError.status).json(customError);
    }
  }

  async updateProduct(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const productUpdated = await cartsService.updateProduct(
        cid,
        pid,
        quantity
      );
      res.status(200).json({
        message: "Your product has been updated",
        product: productUpdated,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async cartDelete(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartsService.cartDelete(cid);
      res.status(200).json({ message: "Your cart has been deleted" });
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.DELETE_CART_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }
}

export const cartsController = new CartsController();
