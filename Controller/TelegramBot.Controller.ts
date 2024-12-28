import TelegramBotModel from "../Schema/telegramBot.Schema";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import BaseError from "../Utils/base_error";

const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken as string, { polling: true });

bot.setMyCommands([
  {
    command: "/start",
    description: "Botni ishga tushurish!",
  },
  {
    command: "/help",
    description: "Botni ishni ishlatish uchun qo'llanma!",
  },
]);

export function BotFunction() {
  bot.on("message", async (msg) => {
    const chat_id = msg.chat.id;
    if (msg.text === "/start") {
      bot.sendMessage(
        chat_id,
        `Assalomu aleykum ${msg.from?.first_name} botimizdan foydalanganingiz uchun rahmat. Murojaatlaringizni yozishingiz mumkin!`
      );
    } else if (msg.text === "/help") {
      bot.sendMessage(
        chat_id,
        `
        /start - Botni ishga tushurish! 
/help - Botni ishni ishlatish uchun qo'llanma!    
      `
      );
    } else {
      await TelegramBotModel.create({
        first_name: msg.from?.first_name,
        sender_id: msg.from?.id,
        content: msg.text,
      });
      bot.sendMessage(
        chat_id,
        `Hurmatli ${msg.from?.first_name} siz yozgan murojaatingiz tez orada @shomurodov_44_66 tomonidan ko'rib chiqiladi!`
      );
    }
  });
}

export const getMessageToday = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayMessage = await TelegramBotModel.find({
      created_date: { $gte: today },
    });

    if (!todayMessage) {
      res.json({
        messages: [],
        message: "Value not found",
      });
    }

    res.json({ messages: todayMessage });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return next(BaseError.BadRequest("Validation Errors", errorMessages));
    }
    next(error);
  }
};

export const getMessageLastTenDay = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();
    const lastTenDayMessage = new Date(today.setDate(today.getDate() - 10));

    const TenDayMessage = await TelegramBotModel.find({
      created_date: { $gte: lastTenDayMessage },
    });

    if (!TenDayMessage) {
      res.json({
        messages: [],
        message: "Value not found",
      });
    }

    res.json({ messages: TenDayMessage });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return next(BaseError.BadRequest("Validation Errors", errorMessages));
    }
    next(error);
  }
};
