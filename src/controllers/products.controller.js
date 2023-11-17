import { productsService } from "../services/products.service.js";
import CustomError from "../errors/custom.error.js";
import { ErrorMessages } from "../errors/errorNum.js";
import { logger } from "../logger/winston.js";

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const products = await productsService.getProducts(req.query);
      res.status(200).json({ products });
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.GET_PRODUCTS_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.getProductById(pid);
      res.status(200).json({ message: "Product by Id", product });
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.PRODUCT_NOT_FOUND
      );
      return res.status(customError.status).json(customError);
    }
  }

  async addProduct(req, res) {
    try {
      const newProduct = await productsService.addProduct(req.body);
      res.status(200).json({ message: "New product created", newProduct });
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.ADD_PRODUCT_ERROR
      );
      return res.status(customError.status).json(customError);
    }
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.updateProduct(pid, req.body);
      logger.info(`Product updated successfully`);
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      logger.error("Error updating product:", error.message);
    }
  }

  async productDelete(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.deleteProduct(pid);
      logger.info(`Product removed successfully`);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      logger.error("Error deleting product:", error.message);
    }
  }
}

export const productsController = new ProductsController();
