import Debug from "./Debug";

export interface IFiledErrors {
  email?: string;
  password?: string;
  name?: string;
}

export class ErrorHandler extends Error {
  public error: string;
  constructor(message: string, public code: number) {
    super(message);

    this.error = this.message;
  }
}
export class AuthError extends ErrorHandler {
  constructor(message: string, public filedErrors?: IFiledErrors) {
    super("Error while authentication: " + message, 400);

    // this.error = this.message;
  }
}
export class NotFoundError extends ErrorHandler {
  constructor(message: string) {
    super(message, 400);
  }
}
export class ServerError extends ErrorHandler {
  constructor(message: string) {
    super("Server Error: " + message, 500);
  }
}
