import mongoose from "mongoose";
import config from "../../config.js";

mongoose
  .connect(
    "mongodb+srv://gonzagalin777:e6fcvUQkvu8zSVy1@cluster0.uonwr28.mongodb.net/ecommerce43400DB?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
