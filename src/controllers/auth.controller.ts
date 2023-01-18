import express, { Request, Response, NextFunction } from "express";
import Debug from "../utils/Debug";
import { createToken } from "../utils/jwt";
import { ITokenData } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { SuccessResponse } from "../utils/successResponse";
import { AuthError } from "../utils/errorHandlers";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prevUser = await userModel.findOne({
      email: req.user_create_data.email,
    });
    if (prevUser)
      throw new AuthError("Already exsist error", { email: "Email is used" });
    const userData = req.user_create_data;

    await userModel.create(userData);
    delete userData.encrypted_password;
    const user: ITokenData = { ...userData };
    const token = createToken(user);
    const response = new SuccessResponse({ user: { ...user, token } });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};

const errors: [string, any] = [
  "Invalid Login user or password not match",
  {
    email: "Email not possibly not exsist",
    password: "Password not possibly not exsist",
  },
];
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.uesr_login_data;
    const user = await userModel.findOne({ email });
    if (!user) throw new AuthError(...errors);
    const valid = await user.compare(password);
    if (!valid) throw new AuthError(...errors);
    const token = createToken({ email: user.email, name: user.name });
    const response = new SuccessResponse({
      user: { email: user.email, name: user.name, token },
    });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};
