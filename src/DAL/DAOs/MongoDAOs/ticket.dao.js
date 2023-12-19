import { ticketModel } from "../../MongoDB/models/tickets.model.js";

export class TicketMongo {
  async createNewTicket(dataTicket) {
    const newTicket = new ticketModel(dataTicket);
    await newTicket.save();
    return newTicket;
  }
}
