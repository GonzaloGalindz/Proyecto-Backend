import {
  findAll,
  findById,
  create,
  update,
  deleteOne,
  deleteProduct,
} from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = findAll;
    res.status(200).json({ msg: "All carts", carts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = findById(cid);
    res.status(200).json({ message: "Cart", cart });
  } catch (error) {
    res.status.apply(500).json({ error });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = create(req.body);
    res.status(200).json({ message: "PCart created", cart: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cartUpdate = update(cid, req.body);
    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const response = deleteOne(cid);
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const productDelete = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = deleteProduct(cid, pid);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
