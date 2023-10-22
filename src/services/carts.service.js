import { cartsMongo } from "../DAL/DAOs/MongoDAOs/carts.dao.js";

class CartsService {
  async getAllCarts() {
    const carts = await cartsMongo.findAll();
    return carts;
  }

  async getCartById(cid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.model
      .findById(cid)
      .populate("products", ["name", "price", "code", "quantity"]);
    return response;
  }

  async createCart(dataCart) {
    const { name, description } = dataCart;
    if (!name || !description) throw new Error("some required data is missing");
    const newCart = await cartsMongo.createOne(dataCart);
    return newCart;
  }

  async cartDelete(cid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.deleteOne(cid);
    return response;
  }

  async cartUpdate(cid, obj) {
    const response = await cartsMongo.updateOne({ _id: cid }, { ...obj });
    return response;
  }

  async productDelete(cid, pid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo.updateOne(
      { _id: cid },
      { $pull: { products: pid } }
    );
    return response;
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo
      .findById(cid)
      .updateOne({ _id: pid }, { $inc: { quantity: quantity } });
  }

  async addProduct(cid, pid) {
    const cart = await cartsMongo.findById(cid);
    if (!cart) throw new Error("Cart not found");
    const response = await cartsMongo
      .findById(cid)
      .updateOne({ $push: { products: pid } });
    return response;
  }
}

export const cartsService = new CartsService();
