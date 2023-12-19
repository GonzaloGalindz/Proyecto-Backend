import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";
import { ticketService } from "../services/tickets.service.js";
import CustomError from "../errors/custom.error.js";
import { ErrorMessages } from "../errors/errorNum.js";
import { logger } from "../logger/winston.js";
import { codeGenerator } from "../utils.js";
import UsersDto from "../DAL/DTOs/users.dto.js";

class CartsController {
  async getAllCarts(req, res) {
    try {
      const carts = await cartsService.getAllCarts();
      res.status(200).json({ message: "All carts", carts });
      logger.info(`All carts`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error reading carts");
    }
  }

  async createcart(req, res) {
    try {
      const newCart = await cartsService.createCart();
      res.status(200).json({ message: "New Cart", cart: newCart });
      logger.info(`Cart created successfully`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error creating cart");
    }
  }

  async getCartById(req, res) {
    const { cid } = req.params;
    try {
      const cartById = await cartsService.getCartById(cid);
      res.status(200).json({ message: "This is your cart", cart: cartById });
      logger.info(`Cart by Id`);
    } catch (error) {
      const customError = CustomError.createError(ErrorMessages.CART_NOT_FOUND);
      res.status(customError.status).json(customError);
    }
  }

  async cartDelete(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartsService.cartDelete(cid);
      res.status(200).json({ message: "Your cart has been deleted" });
      logger.info(`Cart deleted succesfully`);
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.DELETE_CART_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }

  async addProductInCart(req, res) {
    const { cid, pid, quantity } = req.params;
    try {
      const newProduct = await cartsService.addProductInCart(
        cid,
        pid,
        quantity
      );
      logger.info(`Product added successfully`);
      res.status(200).json({ cart: newProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error adding product");
    }
  }

  async updateProductInCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const productUpdated = await cartsService.updateProductInCart(
        cid,
        pid,
        quantity
      );
      res
        .status(200)
        .json({ message: "Product updated", response: productUpdated });
      logger.info(`Product updated in the cart`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error updating product");
    }
  }

  async productDeleteInCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const productDeleted = await cartsService.productDeleteInCart(cid, pid);
      res.status(200).json({ message: "Product deleted" });
      logger.info(`Product deleted successfully`);
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.DELETE_PRODUCT_FROM_CART_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }

  async purchasingProcess(req, res) {
    const cid = req.params.cid;
    try {
      const cart = await cartsService.getCartById(cid);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      const productsNotPurchased = [];
      for (const productInfo of cart.products) {
        const product = await productsService.getProductById(
          productInfo.product
        );
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < productInfo.quantity) {
          productsNotPurchased.push(productInfo.product);
          continue;
        } else {
          product.stock -= productInfo.quantity;
          await product.save();
        }
      }
      cart.productsNotPurchased = productsNotPurchased;
      await cartsService.totalAmountCart(cart);

      //Ticket
      const ticketData = {
        code: await codeGenerator(),
        purchase_datetime: new Date(),
        amount: cart.totalAmount,
        purchaser: UsersDto.email,
      };
      const ticket = await ticketService.createNewTicket(ticketData);
      await cart.save();
      res.status(201).json({
        message: "Successful purchase",
        data: ticket,
        notPurchasedProducts: productsNotPurchased,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const cartsController = new CartsController();
