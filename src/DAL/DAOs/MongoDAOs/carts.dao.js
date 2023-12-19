import { cartsModel } from "../../MongoDB/models/carts.model.js";
import BasicMongo from "./BasicMongo.js";

class CartsMongo extends BasicMongo {
  constructor() {
    super(cartsModel);
  }

  async saveCart(cart) {
    await cart.save();
  }
}

export const cartsMongo = new CartsMongo();
