import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import "./DAL/MongoDB/dbConfig.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import "./services/passport/passportStrategies.js";
import config from "./config.js";
import { generate100FakerProducts } from "./mocks/products.mock.js";
import { logger } from "./logger/winston.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import mailingRouter from "./routes/mailing.router.js";

import { chatMongo } from "./services/chat.service.js";
import { productsService } from "./services/products.service.js";
import { roleIsUser } from "./middlewares/auth.middlewares.js";

const app = express();

//Documentation swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentation of the E-commerce backend project",
      description: "API Rest E-commerce 43400",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//dirname
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
      mongoUrl: config.mongo_uri,
    }),
    secret: config.sessionSecret,
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
app.use("/api/users", usersRouter);
app.use("/api/mailing", mailingRouter);

app.get("/api/chat", roleIsUser, (req, res) => {
  res.render("chat");
});

//route mock faker
app.get("/api/mockingproducts", (req, res) => {
  const fakerProducts = [];
  for (let i = 0; i < 100; i++) {
    const productMocking = generate100FakerProducts();
    fakerProducts.push(productMocking);
  }
  res.status(200).json(fakerProducts);
});

//router logger test
app.get("/api/loggerTest", (req, res) => {
  logger.fatal("Fatal"),
    logger.error("Error"),
    logger.warning("Warning"),
    logger.info("Info"),
    logger.http("Http"),
    logger.debug("Debug"),
    res.send("Logger winston");
});

const httpServer = app.listen(config.port, () => {
  console.log(`Listening express server on port ${config.port}`);
});

const socketServer = new Server(httpServer);

const messages = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("mensaje", async (infoMensaje) => {
    await chatMongo.createOne(infoMensaje);
    const messages = await chatMongo.findAll();
    socketServer.emit("chat", messages);
  });
  socket.on("usuarioNuevo", (usuario) => {
    socket.broadcast.emit("broadcast", usuario);
  });

  socket.on("agregar", async (obj) => {
    const opAdd = await productsService.addProduct(obj);
    if (opAdd) {
      socketServer.emit("added", opAdd.newProduct);
    } else {
      socket.emit("added", opAdd);
    }
  });

  socket.on("eliminar", async (pid) => {
    const opDel = await productsService.deleteProduct(pid);
    if (opDel) {
      socketServer.emit("deleted", opDel.modData);
    } else {
      socket.emit("deleted", opDel);
    }
  });
});
