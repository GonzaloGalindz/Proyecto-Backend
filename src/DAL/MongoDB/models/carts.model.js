import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      default: [],
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
