class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
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

    product.id = this.generateProductId();
    this.products.push(product);
    console.log(`Este producto fue agregado exitosamente`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Not found");
    }
  }

  generateProductId() {
    return this.products.length + 1;
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 367,
  thumbnail: "Sin imagen",
  code: "AAA001",
  stock: 25,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 962,
  thumbnail: "Sin imagen",
  code: "AAA002",
  stock: 30,
});

productManager.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 584,
  thumbnail: "Sin imagen",
  code: "AAA003",
  stock: 15,
});

productManager.addProduct({
  title: "Producto ",
  description: "Descripción del producto 1",
  price: 724,
  thumbnail: "Sin imagen",
  code: "AAA001",
  stock: 20,
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(3));
console.log(productManager.getProductById(5));
