import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["administrator", "user", "premium"],
    default: "user",
  },
  fromGithub: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts",
    default: null,
  },
});

export const usersModel = mongoose.model("Users", usersSchema);
