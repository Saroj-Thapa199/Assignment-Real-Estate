import { Types } from "mongoose"
import { IUser } from "../../models/user.model"
import { Request } from "express"

declare module "express-serve-static-core" {
  interface Request {
    userId?: string
  }
}