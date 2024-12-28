import { model, Schema } from "mongoose";
import { ITelegramBot } from "../DTO/TelegramBot.dto";

const telegramSchema = new Schema<ITelegramBot>({
  first_name:{
    type: String
  },
  sender_id: {
    type: Number
  },
  content: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
}, 
{
  versionKey: false
})

const TelegramBotModel = model<ITelegramBot>("TelegramBot", telegramSchema)
export default TelegramBotModel