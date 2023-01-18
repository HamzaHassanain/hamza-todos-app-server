import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/ErrorHandler";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import Debug from "./utils/Debug";
import {
  ISavedCreatedUser,
  ITokenData,
  IUserLoginData,
} from "./interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user_create_data?: ISavedCreatedUser;
      uesr_login_data?: IUserLoginData;
      user?: ITokenData;
    }
  }
}

dotenv.config();
if (process.env.DEV === "TRUE") Debug.enabled = true;
else Debug.enabled = false;
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.ORIGIN_ALLOWED || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors({}));

app.use(express.static("public"));
app.use(express.json());
// app.use(cookieParser());

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use(ErrorHandler);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then((res) =>
    app.listen(port, async () => {
      Debug.success("Server is running ...");
    })
  )
  .catch((err) => {
    Debug.error(err);
  });
