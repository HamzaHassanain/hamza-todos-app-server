import express, { Request, Response, NextFunction } from "express";
import Debug from "../utils/Debug";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  Debug.error(err);
  res.status(err.code || 500).json({ ...err });
};
