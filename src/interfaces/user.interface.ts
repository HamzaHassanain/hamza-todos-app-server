import { Document, Model } from "mongoose";
export interface ITokenData {
  email: string;
  name: string;
}
export interface IUserLoginData {
  email: string;
  password: string;
}
export interface ISavedCreatedUser {
  email: string;
  name: string;
  encrypted_password: string;
}
export interface ICreateUserReqeustBody {
  email?: string;
  name?: string;
  password?: string;
}
export interface IUser {
  email: string;
  name: string;
  encrypted_password: string;
}
export interface IUserMethods {
  compare(password: string): boolean;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
