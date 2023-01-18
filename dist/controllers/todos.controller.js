"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoneTodo = exports.deleteTodo = exports.addNewTodo = exports.updateTodo = exports.getTodos = void 0;
const Debug_1 = __importDefault(require("../utils/Debug"));
const user_model_1 = __importDefault(require("../models/user.model"));
const successResponse_1 = require("../utils/successResponse");
const errorHandlers_1 = require("../utils/errorHandlers");
const mongoose_1 = require("mongoose");
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.user.email });
        if (!user)
            throw new errorHandlers_1.AuthError("User Does Not Exist ");
        const todos = user.todos;
        const response = new successResponse_1.SuccessResponse({ todos });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findOne({ email: req.user.email });
        if (!user)
            throw new errorHandlers_1.AuthError("User Does Not Exist ");
        const todo = user.todos.find((todo) => todo._id.toString() === id);
        if (!todo)
            throw new errorHandlers_1.NotFoundError("No todo found");
        todo.done = !todo.done;
        yield user.save();
        Debug_1.default.info(user.todos);
        const response = new successResponse_1.SuccessResponse({ todos: user.todos });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTodo = updateTodo;
const addNewTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email: req.user.email });
        if (!user)
            throw new errorHandlers_1.AuthError("User Does Not Exist ");
        const todos = user.todos;
        todos.push({ text, done: false, _id: new mongoose_1.Types.ObjectId() });
        yield user.save();
        Debug_1.default.info(todos);
        const response = new successResponse_1.SuccessResponse({ todos: user.todos });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.addNewTodo = addNewTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findOne({ email: req.user.email });
        if (!user)
            throw new errorHandlers_1.AuthError("User Does Not Exist ");
        const todos = user.todos;
        const newTodos = todos.filter((todo) => todo._id.toString() !== id);
        user.todos = [...newTodos];
        yield user.save();
        Debug_1.default.info(user.todos);
        const response = new successResponse_1.SuccessResponse({ todos: user.todos });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTodo = deleteTodo;
const deleteDoneTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.user.email });
        if (!user)
            throw new errorHandlers_1.AuthError("User Does Not Exist ");
        const todos = user.todos;
        const newTodos = todos.filter((todo) => !todo.done);
        user.todos = [...newTodos];
        yield user.save();
        Debug_1.default.info(user.todos);
        const response = new successResponse_1.SuccessResponse({ todos: user.todos });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDoneTodo = deleteDoneTodo;
//# sourceMappingURL=todos.controller.js.map