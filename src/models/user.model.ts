import { Schema, model } from "mongoose";
import {
  IUser,
  UserModel,
  IUserMethods,
  ITodos,
} from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import Debug from "../utils/Debug";
const TodosSchema = new Schema<ITodos>({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  encrypted_password: {
    required: true,
    type: String,
  },
  todos: [TodosSchema],
});
UserSchema.method("compare", async function (password: string) {
  try {
    const valid: any = await bcrypt.compare(password, this.encrypted_password);
    Debug.log(valid, this.encrypted_password, password);
    return valid;
  } catch (error: unknown) {
    Debug.error("Error at compare function", error);
    return false;
  }
});
export default model<IUser, UserModel>("User", UserSchema);
