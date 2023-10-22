import { ticketModel } from "../../MongoDB/models/tickets.model.js";
import BasicMongo from "./BasicMongo.js";

class TicketMongo extends BasicMongo {
  constructor() {
    super(ticketModel);
  }
}

export const ticketMongo = new TicketMongo();
