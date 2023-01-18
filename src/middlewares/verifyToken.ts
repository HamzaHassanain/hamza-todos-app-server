import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError, ServerError } from "../utils/errorHandlers";
import Debug from "../utils/Debug";

// const User = require("../models/User")

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [type, token] = req.headers.authorization?.split(" ");

  Debug.success(req.headers.authorization);
  try {
    if (!token) throw new AuthError("No Token Was Provided");
    if (type === "Bearer") {
      const secret = process.env.TOEKN_SECRET;
      if (!secret) throw new Error("No TOEKN_SECRET was provided");
      const result = await jwt.verify(token, secret);
      if (typeof result === "string")
        throw new ServerError("Some error with token as it is of type string");
      req.user = result["data"];
      // console.log(result)

      next();
    } else throw new AuthError("Invalid token: Token not bearer");
  } catch (error: unknown) {
    next(error);
  }
};

// check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt
//   if (token) {
//     jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null
//         next()
//       } else {
//         let user = await User.findById(decodedToken.id)
//         res.locals.user = user
//         next()
//       }
//     })
//   } else {
//     res.locals.user = null
//     next()
//   }
// }
