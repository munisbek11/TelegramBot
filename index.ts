import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import ConnectDB from "./DB/Config";
import AuthRouter from "./Router/Auth.Routes";
import errorHandler from "./Middleware/error.middleware";
import { BotFunction } from "./Controller/TelegramBot.Controller";
import TelegramRouter from "./Router/TelegramBot.Routes";
dotenv.config()

const app  = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(bodyParser())
app.use(express.urlencoded({extended: true}))
ConnectDB()
BotFunction()

app.use(AuthRouter)
app.use(errorHandler)
app.use(TelegramRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})