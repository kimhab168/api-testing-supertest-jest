import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODE } from "@/utils/constants/status-code";
import { APP_ERROR_MESSAGE } from "@/utils/constants/app-error-messsage";
import { AppError } from "@/utils/errors";

export function globalError(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  //Handle error
  if (error instanceof AppError) {
    // if error is AppError
    const status = error.status;
    const errors = error.errors;

    console.error(`$UserService - globalErrorHandler() method error: ${error}`);
    return res.status(status).json({ onmessage, error: errors });
  }
  // Unhandle Error
  console.error(
    `$UserService - globalErrorHandler() method unexpected error: ${error}`
  );
  res
    .status(HTTP_STATUS_CODE.SERVER_ERROR)
    .json({ message: APP_ERROR_MESSAGE.serverError });
}
