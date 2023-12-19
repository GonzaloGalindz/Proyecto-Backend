import { ticketService } from "../services/tickets.service.js";
import { codeGenerator } from "../utils.js";

class TicketController {
  async newTicket(req, res) {
    const { code, purchase_datetime, amount, purchaser } = req.body;
    try {
      const code = codeGenerator();
      const ticket = await ticketService.createNewTicket({
        code,
        purchase_datetime,
        amount,
        purchaser,
      });
      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const ticketController = new TicketController();
