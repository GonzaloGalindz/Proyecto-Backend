import { cartsMongo } from "../DAL/DAOs/MongoDAOs/carts.dao.js";

export const findAll = () => {
  const carts = cartsMongo.findAll();
  return carts;
};

export const findById = async (cid) => {
  const cart = await cartsMongo.findById(cid);
  return cart;
};

export const create = (obj) => {
  const cart = cartsMongo.createOne(obj);
  return cart;
};

export const update = async (cid, obj) => {
  const cart = await cartsMongo.updateOne({ _id: cid }, { ...obj });
  return cart;
};

export const deleteOne = async (cid) => {
  const response = await cartsMongo.deleteCart(cid);
  return response;
};

export const deleteProduct = async (cid, pid) => {
  const response = await cartsMongo.deleteProductInCart(
    { _id: cid },
    { $pull: { products: pid } }
  );
  return response;
};

export const updateProductInCart = async (cid, pid, newQuantity) => {
  const response = await cartsMongo.updateProductInCart(cid, pid, newQuantity);
  return response;
};
