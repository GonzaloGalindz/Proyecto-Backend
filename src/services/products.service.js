import { productsMongo } from "../DAL/DAOs/MongoDAOs/products.dao.js";
import { query } from "express";

class ProductsService {
  async getAllProducts(obj) {
    const { limit = 5, page = 1, ...query } = obj;
    const result = await productsMongo.model.paginate(query, { limit, page });
    const info = {
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: `http://localhost:8080/api/products?page=${result.prevPage}`,
      nextLink: `http://localhost:8080/api/products?page=${result.nextPage}`,
    };
    return { info };
  }

  async getProducts() {
    const allProducts = await productsMongo.findAll();
    return allProducts;
  }

  async addProduct(dataProduct) {
    const { name, description, price, stock, code, quantity } = dataProduct;
    if (!name || !description || !price || !stock || !code || !quantity)
      throw new Error("some data required is missing");
    const newProduct = await productsMongo.createOne(dataProduct);
    return newProduct;
  }

  async getProductById(pid) {
    const product = await productsMongo.findById(pid);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async updateProduct(pid, obj) {
    const product = await productsMongo.findById(pid);
    if (!product) throw new Error("Product not found");
    const response = await productsMongo.updateOne({ _id: pid }, { ...obj });
    return response;
  }

  async deleteProduct(pid) {
    const product = await productsMongo.findById(pid);
    if (!product) throw new Error("Product not found");
    const response = await productsMongo.deleteOne(pid);
    return response;
  }
}

export const productsService = new ProductsService();
