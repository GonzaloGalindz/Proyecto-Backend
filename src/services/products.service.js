import { productsMongo } from "../DAL/DAOs/MongoDAOs/products.dao.js";

export const findAll = async () => {
  const products = await productsMongo.findAll();
  return products;
};

export const findProducts = async (obj) => {
  const products = await productsMongo.findAll(obj);
  return products;
};

export const findById = async (pid) => {
  const product = await productsMongo.findById(pid);
  return product;
};

export const create = async (obj) => {
  const product = await productsMongo.createOne(obj);
  return product;
};

export const update = async (pid, obj) => {
  const product = await productsMongo.updateOne({ _id: pid }, { ...obj });
  return product;
};

export const deleteOne = async (pid) => {
  const response = await productsMongo.deleteOne(pid);
  return response;
};
