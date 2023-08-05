import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const arrayCartManager = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(arrayCartManager);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getCart(id) {
    try {
      const arrayCartManager = await this.getCarts();
      const oneCart = arrayCartManager.find((c) => c.id === id);
      return oneCart;
    } catch (error) {
      return error;
    }
  }

  async createCart() {
    try {
      const arrayCartManager = await this.getCarts();
      let id;
      if (!arrayCartManager.length) {
        id = 1;
      } else {
        id = arrayCartManager[arrayCartManager.length - 1].id + 1;
      }
      const newCart = { products: [], id };
      arrayCartManager.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(arrayCartManager));
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cid, pid) {
    try {
      const arrayCartManager = await this.getCarts;
      const oneCartManager = arrayCartManager.find((c) => c.id === cid);
      const cartIndex = oneCartManager.products.findIndex((p) => p.id === pid);
      if (cartIndex === -1) {
        oneCartManager.products.push({ id: pid, quantity: 1 });
      } else {
        oneCartManager.products[cartIndex].quantity++;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(arrayCartManager));
      return oneCartManager;
    } catch (error) {
      return error;
    }
  }
}

const cartsManager = new CartManager("../Carrito.json");
export default cartsManager;
