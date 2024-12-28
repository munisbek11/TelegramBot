import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import BaseError from "../Utils/base_error";

dotenv.config()

async function ConnectDB(){
  try{
    const DB_URI = process.env.DB_URI
    if(!DB_URI){
      throw BaseError.BadRequest("Database URI not found")
    }
     await mongoose.connect(DB_URI).then(() => {console.log("MongoDb Successfully connected")}).catch((err) =>{console.log(err.message)})
  }catch(error:any){
    throw BaseError.BadRequest("unknown error")
  }
}

export default ConnectDB