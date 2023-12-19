import { TicketMongo } from "../DAL/DAOs/MongoDAOs/ticket.dao.js";

class TicketService {
  constructor() {
    this.ticket = new TicketMongo();
  }
  async createNewTicket(dataTicket) {
    try {
      const newTicket = await this.ticket.createNewTicket(dataTicket);
      return newTicket;
    } catch (error) {
      throw new Error("Error generating ticket");
    }
  }
}

export const ticketService = new TicketService();
