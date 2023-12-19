import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

import { ticketModel } from "./DAL/MongoDB/models/tickets.model.js";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashData) => {
  return bcrypt.compare(data, hashData);
};

async function codeGenerator() {
  let codeTicket;
  let isUnique = false;

  while (!isUnique) {
    codeTicket = generateCode();
    const ticketCode = await ticketModel.findOne({ code: codeTicket });
    if (!ticketCode) {
      isUnique = true;
    }
  }
  return codeTicket;
}

function generateCode() {
  return "Code" + Math.random().toString(15);
}

export { codeGenerator };
