import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import productsManager from "./dao/managers/productManager.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { chatMongo } from "./dao/managers/chatMongo.js";
import "./dao/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando servidor express en el puerto 8080");
});

const socketServer = new Server(httpServer);

const messages = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  socket.on("mensaje", async (infoMensaje) => {
    await chatMongo.createOne(infoMensaje);
    const messages = await chatMongo.findAll();
    socketServer.emit("chat", messages);
  });
  socket.on("usuarioNuevo", (usuario) => {
    socket.broadcast.emit("broadcast", usuario);
  });
  socket.on("agregar", async (objProd) => {
    const opAdd = await productsManager.addProduct(objProd);
    if (opAdd) {
      socketServer.emit("added", opAdd.newProduct);
    } else {
      socket.emit("added", opAdd);
    }
  });

  socket.on("eliminar", async (id) => {
    const opDel = await productsManager.deleteProduct(id);
    if (opDel) {
      socketServer.emit("deleted", opDel.modData);
    } else {
      socket.emit("deleted", opDel);
    }
  });
});
