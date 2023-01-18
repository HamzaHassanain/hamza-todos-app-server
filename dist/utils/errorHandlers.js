"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.NotFoundError = exports.AuthError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.error = this.message;
    }
}
exports.ErrorHandler = ErrorHandler;
class AuthError extends ErrorHandler {
    constructor(message, filedErrors) {
        super("Error while authentication: " + message, 400);
        this.filedErrors = filedErrors;
        // this.error = this.message;
    }
}
exports.AuthError = AuthError;
class NotFoundError extends ErrorHandler {
    constructor(message) {
        super(message, 400);
    }
}
exports.NotFoundError = NotFoundError;
class ServerError extends ErrorHandler {
    constructor(message) {
        super("Server Error: " + message, 500);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=errorHandlers.js.map