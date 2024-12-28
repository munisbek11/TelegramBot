import mongoose from "mongoose"
import { IAuthSchema } from "../DTO/Auth.Dto"

const AuthSchema = new mongoose.Schema<IAuthSchema> ({
  full_name: {
    type: String,
    required: [true, "full_name kiritish majburiy!"],
    minLength: [6, "full_name 6 harfdan kam bo'lmasin!"],
    maxLength: [100, "full_name 100 harfdan ko'p bo'lmasin!"]
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "superAdmin", "user"],
      message: "{VALUES} talab qilinadi"
    },
    required: [true, "role kiritish majburiy!"]
  },
  password: {
    type: String,
    required: [true, "password kiritish majburiy!"],
    minLength: [8, "password 8 harfdan kam bo'lmasin!"],
  },
  phone_number: {
    type: Number,
    minLength: [9, "phone_number 9 raqamdan kam bo'lmasin!"],
    maxLength: [15, "phone_number 15 raqamdan ko'p bo'lmasin!"]
  }
}, 
{
  versionKey: false,
  timestamps:true
})

const AuthModel = mongoose.model<IAuthSchema>("Auth", AuthSchema)

export default AuthModel