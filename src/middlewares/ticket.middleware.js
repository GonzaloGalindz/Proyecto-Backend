import { productsMongo } from "../DAL/DAOs/MongoDAOs/products.dao.js";

export const validateProductStock = async (product) => {
  const { quantity, id } = product;
  const productDb = await productsMongo.findById(id);
  if (quantity <= productDb.stock) {
    const newStock = quantity - productDb.stock;
    const result = await productsMongo.model
      .findById(id)
      .updateOne({ stock: newStock });
    return result;
  } else {
    throw new Error("no hay suficiente stock del producto");
  }
};
