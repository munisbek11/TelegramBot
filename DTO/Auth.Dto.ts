import {Document} from "mongoose"
export interface IAuthSchema extends Document{
  full_name: string
  role: "user" | "admin"  | "superAdmin",
  password: string
  phone_number: number
}