import { MessagesModel } from "../models/messages.model.js";

class ChatMongo {
  async findAll() {
    try {
      const messages = await MessagesModel.find({});
      return messages;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const message = await MessagesModel.create(obj);
      return message;
    } catch (error) {
      return error;
    }
  }
}

export const chatMongo = new ChatMongo();
