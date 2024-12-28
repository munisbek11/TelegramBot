import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import AuthModel from "../Schema/Auth.Schemas";
import { IAuthSchema } from "../DTO/Auth.Dto";
import BaseError from "../Utils/base_error";
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const Register = async (req: Request, res: Response, next: NextFunction): Promise<Response| void> => {
  try{
    const {full_name, role, password, phone_number} = req.body as IAuthSchema
    const user = await AuthModel.findOne({full_name})
    if(user){
      throw BaseError.BadRequest("User already exists!")
    }
    if(!password){
      throw BaseError.BadRequest("Password not found!")
    }
    let hash = await bcrypt.hash(password, 12)

    await AuthModel.create({full_name, role, password: hash, phone_number})
    res.status(201).json({
      message: "Registered"
    })

  } catch(error:any){
    if(error.name === "ValidationError"){
      const errorMessages = Object.values(error.errors).map((err:any)=> err.message)
      return next(BaseError.BadRequest("Validation Errors", errorMessages))
    }
    next(error)
  }
}

export const Login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { full_name, password } = req.body as IAuthSchema;
    const user = await AuthModel.findOne({ full_name });
    if (!user) {
      throw BaseError.BadRequest("User not found!");
    }
    const decrypt = await bcrypt.compare(password, user.password);
    if (!decrypt) {
      throw BaseError.BadRequest("Wrong password");
    }

    const payload = {
      id: user._id,
      full_name: user.full_name,
      role: user.role
    };

    const secretKey = process.env.JWT_SECRET_KEY || "bek12_10";
    const token = JWT.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: "Successfully",
      token
    });

  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message);
      return next(BaseError.BadRequest("Validation Errors", errorMessages));
    }

    next(error);
  }
};