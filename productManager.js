const fs = require("fs");

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
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.log("Por favor, completar todos los campos requeridos");
        return;
      }
      if (this.products.some((prod) => prod.code === product.code)) {
        console.log(`Ya existe un producto con este codigo: ${product.code}.`);
        return;
      }
      const prodManager = await this.getProducts();
      let id;
      if (!prodManager.length) {
        id = 1;
      } else {
        id = prodManager[prodManager.length - 1].id + 1;
      }
      prodManager.push({ ...product, id });
      await fs.promises.writeFile(this.path, JSON.stringify(prodManager));
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

const productsManager1 = {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 367,
  thumbnail: "Sin imagen",
  code: "AAA001",
  stock: 25,
};

const productsManager2 = {
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 962,
  thumbnail: "Sin imagen",
  code: "AAA002",
  stock: 30,
};

const productsManager3 = {
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 584,
  thumbnail: "Sin imagen",
  code: "AAA003",
  stock: 15,
};

const productsManager4 = {
  title: "Producto 4",
  description: "Descripción del producto 4",
  price: 724,
  thumbnail: "Sin imagen",
  code: "AAA004",
  stock: 20,
};

async function managerProd() {
  const productManager = new ProductManager("Products.json");
  await productManager.addProduct(productsManager1);
  await productManager.addProduct(productsManager2);
  await productManager.addProduct(productsManager3);
  await productManager.addProduct(productsManager4);
  const arrayAllProducts = await productManager.getProducts();
  console.log(arrayAllProducts);
  const prodById = await productManager.getProductById(2);
  console.log(prodById);
  // await productManager.updateProduct(2, {
  //   title: "Producto 5",
  //   code: "AAA005",
  //   description: "Descripcion del producto 5",
  // });
  // await productManager.deleteProduct(1);
}

managerProd();
