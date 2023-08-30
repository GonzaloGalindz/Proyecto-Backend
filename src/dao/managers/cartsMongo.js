import { CartsModel } from "../models/carts.model.js";

class CartsMongo {
  async findAll() {
    try {
      const carts = await CartsModel.find({});
      return carts;
    } catch (error) {
      return error;
    }
  }

  async findById(cid) {
    try {
      const cart = await CartsModel.findById(cid).populate("products");
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newCart = await CartsModel.create(obj);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async updateone(cid, obj) {
    try {
      const updCart = await CartsModel.updateOne({ _id: cid }, { ...obj });
      return updCart;
    } catch (error) {
      return error;
    }
  }

  async updateProductInCart(cid, obj) {
    try {
      const updCart = await CartsModel.updateOne({ _id: cid }, { ...obj });
      return updCart;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(cid) {
    try {
      const deletedCart = await CartsModel.findByIdAndDelete(cid);
      return deletedCart;
    } catch (error) {
      return error;
    }
  }

  async deleteProductInCart(cid, pid) {
    try {
      const cart = await CartsModel.findById(cid);
      if (!cart) throw new Error("Cart not found");

      const deleteProd = await CartsModel.updateOne(
        { _id: cid },
        { $pull: { products: pid } }
      );
      return deleteProd;
    } catch (error) {
      return error;
    }
  }
}

export const cartsMongo = new CartsMongo();
