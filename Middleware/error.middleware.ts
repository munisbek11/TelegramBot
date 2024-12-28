import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import BaseError from "../Utils/base_error";
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
    return;
  }
  res.json({
    message: "Server Error",
  });
};

export default errorHandler;
