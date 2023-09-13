import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import loginRouter from "./routes/login.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
// import { chatMongo } from "./dao/managers/chatMongo.js";
import "./dao/dbConfig.js";
import { productsMongo } from "./dao/managers/productsMongo.js";
import passport from "passport";
import "./passport/passportStrategies.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//cookies
app.use(cookieParser("SecretKeyCookies"));

//sessions
app.use(
  session({
    store: new mongoStore({
      mongoUrl:
        "mongodb+srv://gonzagalin777:e6fcvUQkvu8zSVy1@cluster0.uonwr28.mongodb.net/ecommerce43400DB?retryWrites=true&w=majority",
    }),
    secret: "secretSession",
    cookie: { maxAge: 60000 },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("", loginRouter);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando servidor express en el puerto 8080");
});

const socketServer = new Server(httpServer);

// const messages = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  //   socket.on("disconnect", () => {
  //     console.log(`Usuario desconectado: ${socket.id}`);
  //   });

  //   socket.on("mensaje", async (infoMensaje) => {
  //     await chatMongo.createOne(infoMensaje);
  //     const messages = await chatMongo.findAll();
  //     socketServer.emit("chat", messages);
  //   });
  //   socket.on("usuarioNuevo", (usuario) => {
  //     socket.broadcast.emit("broadcast", usuario);
  //   });

  socket.on("agregar", async (obj) => {
    const opAdd = await productsMongo.createOne(obj);
    if (opAdd) {
      socketServer.emit("added", opAdd.newProduct);
    } else {
      socket.emit("added", opAdd);
    }
  });

  socket.on("eliminar", async (pid) => {
    const opDel = await productsMongo.deleteOne(pid);
    if (opDel) {
      socketServer.emit("deleted", opDel.modData);
    } else {
      socket.emit("deleted", opDel);
    }
  });
});
