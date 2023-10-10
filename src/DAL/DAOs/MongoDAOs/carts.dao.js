import { cartsModel } from "../../MongoDB/models/carts.model.js";
import BasicMongo from "./BasicMongo.js";

class CartsMongo extends BasicMongo {
  constructor() {
    super(cartsModel);
  }
  async saveCart(cart) {
    try {
      await cart.save();
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(cid, obj) {
    try {
      const updCart = await cartsModel.updateOne({ _id: cid }, { ...obj });
      return updCart;
    } catch (error) {
      return error;
    }
  }

  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) throw new Error("Cart not found");

      const deleteProd = await cartsModel.updateOne(
        { _id: cid },
        { $pull: { products: pid } }
      );
      return deleteProd;
    } catch (error) {
      return error;
    }
  }

  async updateProductInCart(cid, pid, newQuantity) {
    const cart = await cartsModel.findById(cid);
    const product = cart.products.find((p) => p.id == pid);
    if (product) {
      product.quantity = newQuantity;
    }
    try {
      await this.saveCart(cart);
    } catch (error) {
      return error;
    }
    return cart;
  }
}

export const cartsMongo = new CartsMongo();
