import { cartsModel } from "../../MongoDB/models/carts.model.js";
import BasicMongo from "./BasicMongo.js";

class CartsMongo extends BasicMongo {
  constructor() {
    super(cartsModel);
  }
}

export const cartsMongo = new CartsMongo();
