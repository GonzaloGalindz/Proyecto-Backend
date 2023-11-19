import { cartsMongo } from "../DAL/DAOs/MongoDAOs/carts.dao.js";

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

  async createCart(dataCart) {
    const { name, description } = dataCart;
    if (!name || !description) throw new Error("Some required data is missing");
    const newCart = await cartsMongo.createOne(dataCart);
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
}

export const cartsService = new CartsService();
