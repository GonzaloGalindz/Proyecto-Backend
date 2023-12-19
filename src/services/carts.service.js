import { cartsMongo } from "../DAL/DAOs/MongoDAOs/carts.dao.js";
import { productsService } from "./products.service.js";

class CartsService {
  async getAllCarts() {
    const carts = await cartsMongo.findAll();
    return carts;
  }

  async getCartById(cid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.findById(cid);
    return response;
  }

  async createCart() {
    const newCart = await cartsMongo.createOne();
    return newCart;
  }

  async cartDelete(cid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.deleteOne(cid);
    return response;
  }

  async addProductInCart(cid, pid, quantity) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const existingProduct = cart.products.find((p) => p._id.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ product: pid, quantity: quantity || 1 });
    }
    await cart.save();
    return cart;
  }

  async updateProductInCart(cid, pid, newQuantity) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const existingProduct = cart.products.find((p) => p._id.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += newQuantity;
    } else {
      cart.products.push({ product: pid, quantity: newQuantity });
    }
    await cart.save();
    return cart;
  }

  async productDeleteInCart(cid, pid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.updateOne(
      { _id: cid },
      { $pull: { products: pid } }
    );
    return response;
  }

  async totalAmountCart(cart) {
    try {
      if (!cart) {
        throw new Error("Cart not found");
      }
      let totalAmount = 0;
      for (const productInfo of cart.products) {
        const product = await productsService.getProductById(
          productInfo.product
        );
        if (product) {
          totalAmount += product.price * productInfo.quantity;
        }
      }
      cart.totalAmount = totalAmount;
      await cartsMongo.saveCart(cart);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const cartsService = new CartsService();
