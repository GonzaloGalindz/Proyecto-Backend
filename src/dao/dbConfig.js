import mongoose from "mongoose";

const uri =
  "mongodb+srv://gonzagalin777:e6fcvUQkvu8zSVy1@cluster0.uonwr28.mongodb.net/ecommerce43400DB?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
