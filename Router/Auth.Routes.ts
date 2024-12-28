import { Router, RequestHandler } from "express";
import { Login, Register } from "../Controller/Auth.Controller";

const AuthRouter = Router()

AuthRouter.post("/register", Register as RequestHandler)
AuthRouter.post("/login", Login as RequestHandler)

export default AuthRouter;