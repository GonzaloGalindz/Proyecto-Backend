import express from "express";
import productsManager from "./productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const prods = await productsManager.getProducts();
    res.status(200).json({ msg: "Products", prods });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productsManager.getProductById(+pid);
    res.status(200).json({ msg: "Product by Id", prod });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("Escuchando servidor express en el puerto 8080");
});
