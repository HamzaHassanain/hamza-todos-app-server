import express, { Request, Response, NextFunction, response } from "express";
import Debug from "../utils/Debug";
import { createToken } from "../utils/jwt";
import { ITodos, ITokenData } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { SuccessResponse } from "../utils/successResponse";
import { AuthError, NotFoundError } from "../utils/errorHandlers";
import { Schema, Types } from "mongoose";

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) throw new AuthError("User Does Not Exist ");
    const todos = user.todos;
    const response = new SuccessResponse({ todos });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) throw new AuthError("User Does Not Exist ");

    const todo = user.todos.find((todo) => todo._id.toString() === id);
    if (!todo) throw new NotFoundError("No todo found");
    todo.done = !todo.done;
    await user.save();
    Debug.info(user.todos);
    const response = new SuccessResponse({ todos: user.todos });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};
export const addNewTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body;
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) throw new AuthError("User Does Not Exist ");
    const todos = user.todos;
    todos.push({ text, done: false, _id: new Types.ObjectId() });
    await user.save();
    Debug.info(todos);
    const response = new SuccessResponse({ todos: user.todos });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) throw new AuthError("User Does Not Exist ");
    const todos = user.todos;
    const newTodos = todos.filter((todo) => todo._id.toString() !== id);
    user.todos = [...newTodos];
    await user.save();
    Debug.info(user.todos);
    const response = new SuccessResponse({ todos: user.todos });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteDoneTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) throw new AuthError("User Does Not Exist ");
    const todos = user.todos;
    const newTodos = todos.filter((todo) => !todo.done);
    user.todos = [...newTodos];
    await user.save();
    Debug.info(user.todos);
    const response = new SuccessResponse({ todos: user.todos });
    res.json(response);
  } catch (error: unknown) {
    next(error);
  }
};
