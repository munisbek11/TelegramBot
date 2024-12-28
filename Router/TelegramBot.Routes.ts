import { Router, RequestHandler } from "express";
import { getMessageLastTenDay, getMessageToday } from "../Controller/TelegramBot.Controller";

const TelegramRouter = Router()

TelegramRouter.get("/get_today_message", getMessageToday as RequestHandler)
TelegramRouter.get("/get_ten_day_message", getMessageLastTenDay as RequestHandler)

export default TelegramRouter;