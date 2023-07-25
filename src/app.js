import express from "express";
import productsManager from "./productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  try {
    const prods = await productsManager.getProducts();
    const prodLimit = await prods.slice(0, limit);
    if (!limit) {
      res.status(200).json({ msg: "Products", prods });
    } else {
      res.status(200).json({ msg: "Limited Products", prodLimit });
    }
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
