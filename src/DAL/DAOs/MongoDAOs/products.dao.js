import { productsModel } from "../../MongoDB/models/products.model.js";
import BasicMongo from "./BasicMongo.js";

class ProductsMongo extends BasicMongo {
  constructor() {
    super(productsModel);
  }
}

export const productsMongo = new ProductsMongo();
