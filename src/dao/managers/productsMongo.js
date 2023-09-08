import { productsModel } from "../models/products.model.js";

class ProductsMongo {
  async findProducts() {
    try {
      const products = await productsModel.find({});
      return products;
    } catch (error) {
      return error;
    }
  }

  async findAll(obj) {
    const { limit = 10, page = 1, sortPrice, ...query } = obj;
    try {
      const result = await productsModel.paginate(query, {
        limit,
        page,
        sort: { price: sortPrice },
      });
      const data = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        nextPage: result.hasNextPage ? result.nextPage : null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `/api/products?page=${result.prevPage}`
          : null,
        nextLink: result.hasNextPage
          ? `/api/products?page=${result.nextPage}`
          : null,
      };
      return data;
    } catch (error) {
      return error;
    }
  }

  async findById(pid) {
    try {
      const prod = await productsModel.findById(pid);
      return prod;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newProduct = await productsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async updateone(pid, obj) {
    try {
      const updProduct = await productsModel.updateOne(
        { _id: pid },
        { ...obj }
      );
      return updProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(pid) {
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(pid);
      return deletedProduct;
    } catch (error) {
      return error;
    }
  }

  // async aggregationMet() {
  //   try {
  //     const response = await productsModel.aggregate([
  //       { $match: { calificacion: { $gt: 5 } } },
  //       {
  //         $group: {
  //           _id: "$gender",
  //           gender_count: { $count: {} },
  //           promedio_calificacion: { $avg: "$calificacion" },
  //         },
  //       },
  //       { $sort: { gender_count: -1 } },
  //       { $match: { gender_count: { $gte: 4 } } },
  //       //  {$count: 'total'}
  //     ]);

  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

export const productsMongo = new ProductsMongo();
