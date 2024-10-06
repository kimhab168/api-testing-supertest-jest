import { HTTP_STATUS_CODE } from "./constants/status-code";

export class AppError extends Error {
  public readonly status: number;
  public errors?: {};
  constructor({
    message,
    status,
    errors,
  }: {
    message: string;
    status: number;
    errors?: {};
  }) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype); // Restore the prototype chain
  }
}
export class InvalidInputError extends AppError {
  constructor({
    message = "Invalid input provided.",
    errors,
  }: {
    message?: string;
    errors?: {};
  }) {
    super({ message, status: HTTP_STATUS_CODE.BAD_REQUEST, errors });
    console.log(errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource was not found.") {
    super({ message, status: HTTP_STATUS_CODE.NOT_FOUND });
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message = "Authentication failed. Please check your credentials."
  ) {
    super({ message, status: HTTP_STATUS_CODE.UNAUTHORIZED });
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "You do not have permission to access this resource.") {
    super({ message, status: HTTP_STATUS_CODE.FORBIDDEN });
  }
}

export class ResourceConflictError extends AppError {
  constructor(
    message = "Resource conflict occurred. The resource might already exist."
  ) {
    super({ message, status: HTTP_STATUS_CODE.CONFLICT });
  }
}

// ========================
// Server Error
// ========================

export class InternalServerError extends AppError {
  constructor({
    message = "An internal server error occurred.",
    errors,
  }: {
    message: string;
    errors?: {};
  }) {
    super({ message, status: HTTP_STATUS_CODE.SERVER_ERROR, errors });
  }
}

// Add More Possible Error
