import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const arrayProductManager = await fs.promises.readFile(
          this.path,
          "utf-8"
        );
        return JSON.parse(arrayProductManager);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock
      ) {
        console.log("Por favor, completar todos los campos requeridos");
        return;
      }
      const prodManager = await this.getProducts();
      const productAdd = prodManager.some((prod) => prod.code === product.code);
      if (productAdd) {
        console.log("Ya existe un producto con este codigo");
        return;
      }

      let id;
      if (!prodManager.length) {
        id = 1;
      } else {
        id = prodManager[prodManager.length - 1].id + 1;
      }
      const newProduct = { ...product, id };
      prodManager.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(prodManager));
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const prodManager = await this.getProducts();
      const product = prodManager.find((prod) => prod.id === id);
      if (!product) {
        return "Usuario con id no encontrado";
      }
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, product) {
    try {
      const prodManager = await this.getProducts();
      const indexProd = prodManager.findIndex((prod) => prod.id === id);
      if (indexProd === -1) {
        return "No hay un usuario con ese id";
      }
      const prodUpdate = prodManager[indexProd];
      prodManager[indexProd] = { ...prodUpdate, ...product };
      await fs.promises.writeFile(this.path, JSON.stringify(prodManager));
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const prodManager = await this.getProducts();
      const newArrayProd = prodManager.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProd));
    } catch (error) {
      return error;
    }
  }
}

const productsManager = new ProductManager("../Products.json");
export default productsManager;
