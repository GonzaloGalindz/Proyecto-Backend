import mongoose from "mongoose";
import config from "../../config.js";

mongoose
  .connect(
    "mongodb+srv://gonzagalin777:e6fcvUQkvu8zSVy1@cluster0.uonwr28.mongodb.net/ecommerce43400DB?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
