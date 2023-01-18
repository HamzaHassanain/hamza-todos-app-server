import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { AuthError, IFiledErrors, NotFoundError } from "../utils/errorHandlers";
import bcrypt from "bcrypt";
import {
  ICreateUserReqeustBody,
  ISavedCreatedUser,
  ITokenData,
} from "../interfaces/user.interface";
import userModel from "../models/user.model";
import Debug from "../utils/Debug";
export async function validateSignupData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, name, password }: ICreateUserReqeustBody = req.body;

  Debug.info(req.body);

  try {
    const errors: IFiledErrors = buildErrors(email, name, password);

    if (errors.email || errors.name || errors.password)
      throw new AuthError("", errors);

    const salt = await bcrypt.genSalt();
    const encrypted_password = await bcrypt.hash(password, salt);

    const user_create_data: ISavedCreatedUser = {
      encrypted_password,
      email,
      name,
    };
    req.user_create_data = user_create_data;
    next();
  } catch (error: unknown) {
    next(error);
  }
}
export async function validateLoginData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password }: ICreateUserReqeustBody = req.body;
  try {
    const errors: IFiledErrors = buildErrors(email, "", password);

    if (errors.email || errors.password) throw new AuthError("", errors);

    req.uesr_login_data = { email, password };
    next();
  } catch (error: unknown) {
    next(error);
  }
}
function buildErrors(email: any, name: any, password: any): IFiledErrors {
  const errors: IFiledErrors = {};
  if (!validator.isEmail(email || ""))
    errors.email = "The email you entered is invalid or no email";
  if (!password || password.length < 6)
    errors.password =
      "The password you entered is invalid , password must be minimum of 6 characters";
  if (!name || name.length < 6)
    errors.name =
      "The name you entered is invalid, name must be minimum of 6 characters";

  return errors;
}
