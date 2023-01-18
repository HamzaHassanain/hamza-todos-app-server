import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_MAX_AGE } from "./consts";
import { ITokenData } from "../interfaces/user.interface";
dotenv.config();
export const maxAge = TOKEN_MAX_AGE;
export const createToken = (data: ITokenData) => {
  const secret = process.env.TOEKN_SECRET;
  if (!secret) throw new Error("No TOEKN_SECRET was provided");
  return jwt.sign({ data }, secret, {
    expiresIn: maxAge,
  });
};
