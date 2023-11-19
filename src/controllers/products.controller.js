import { productsService } from "../services/products.service.js";
import CustomError from "../errors/custom.error.js";
import { ErrorMessages } from "../errors/errorNum.js";
import { logger } from "../logger/winston.js";

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const products = await productsService.getProducts(req.query);
      res.status(200).json({ products });
      logger.info(`All products`);
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
      logger.info(`Product by Id`);
    } catch (error) {
      const customError = CustomError.createError(
        ErrorMessages.PRODUCT_NOT_FOUND
      );
      return res.status(customError.status).json(customError);
    }
  }

  async addProduct(req, res) {
    const dataProduct = req.body;
    try {
      const newProduct = await productsService.addProduct(dataProduct);
      res
        .status(200)
        .json({ message: "New product created", product: newProduct });
      logger.info(`Product added successfully`);
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
      res.status(200).json({ message: "Product updated", product });
      logger.info(`Product updated successfully`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error updating product");
    }
  }

  async productDelete(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.deleteProduct(pid);
      res.status(200).json({ message: "Product deleted" });
      logger.info(`Product removed successfully`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error deleting product");
    }
  }
}

export const productsController = new ProductsController();
