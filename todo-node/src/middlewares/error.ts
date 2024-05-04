// Error middleware for express

// Interface for Error response
interface ErrorResponse {
  status: number;
  message: string;
  err_stack?: string; // Change type to string for generic error messages only
}

export interface CustomError {
  statusCode?: number;
  customMessage: string;
  err?: string; // Change type to string for generic error messages only
}

import { Request, Response, NextFunction } from "express";

// Default function is exported to be a middleware and handle all errors
export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the err object has a statusCode field, use that or default error code is 500
  // If the err object has a customMessage field, use that or default message is "Please contact the ADMIN"
  // Storing error response in a constant
  const errorResponse: ErrorResponse = {
    status: err.statusCode ? err.statusCode : 500,
    message: err.customMessage ? err.customMessage : "An internal server error has occurred.",
  };

  // Ensure that error stack is not sent to the client, especially not in production
  if (process.env.NODE_ENV !== 'production') {
    // Only include error stack details in non-production environments
    errorResponse.err_stack = "Error details are available in server logs.";
  }

  // Send the response to the consumer
  res.status(errorResponse.status).send(errorResponse);
};
