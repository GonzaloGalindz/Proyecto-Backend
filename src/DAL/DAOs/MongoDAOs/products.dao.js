import { productsModel } from "../../MongoDB/models/products.model.js";
import BasicMongo from "./BasicMongo.js";

class ProductsMongo extends BasicMongo {
  constructor() {
    super(productsModel);
  }

  async findProducts(obj) {
    const { limit = 10, page = 1, sortPrice, ...query } = obj;
    try {
      const result = await productsModel.paginate(query, {
        limit,
        page,
        sort: { price: sortPrice },
      });
      const data = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        nextPage: result.hasNextPage ? result.nextPage : null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `/api/products?page=${result.prevPage}`
          : null,
        nextLink: result.hasNextPage
          ? `/api/products?page=${result.nextPage}`
          : null,
      };
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateone(pid, obj) {
    try {
      const updProduct = await productsModel.updateOne(
        { _id: pid },
        { ...obj }
      );
      return updProduct;
    } catch (error) {
      return error;
    }
  }
}

export const productsMongo = new ProductsMongo();
