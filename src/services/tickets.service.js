import { ticketMongo } from "../DAL/DAOs/MongoDAOs/ticket.dao.js";
import { productsMongo } from "../DAL/DAOs/MongoDAOs/products.dao.js";

class TicketService {
  async validateProductStock(product) {
    const { quantity, pid } = product;
    const productDb = await productsMongo.findById(pid);
    if (quantity <= productDb.stock) {
      const newStock = quantity - productDb.stock;
      const result = await productsMongo
        .findById(id)
        .updateOne({ stock: newStock });
      return result;
    }
  }
}

export const ticketService = new TicketService();
