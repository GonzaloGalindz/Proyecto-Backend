import mongoose from "mongoose";
import config from "../../config.js";

mongoose
  .connect(config.mongo_uri)
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
