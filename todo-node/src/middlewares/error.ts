//Error middleware for express

//Interface for Error response
interface ErrorResponse {
  status: number;
  message: string;
  err_stack?: any; //replace with object for stack traces
}

export interface CustomError {
  statusCode?: number;
  customMessage: string;
  err?: any; //remove this to handle improp err handling.
}

import { Request, Response, NextFunction } from "express";

//Default function is exported to be a middleware and handle all errors
export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //If the err object has a statusCode field, use that or default error code is 500
  //If the err object has a customMessage field, use that or default message is "Please contact the ADMIN"
  //Storing error response in a constant
  const errorResponse: ErrorResponse = {
    status: err.statusCode ? err.statusCode : 500,
    message: err.customMessage ? err.customMessage : "An internal server error has occurred.",
  };
  //If env is dev, send the err stack
  errorResponse.err_stack = err.err ? err.err : { message: "No error stack available." };  // to fix errorResponse.err_stack = err;
  //Send the response to the consumer
  res.status(errorResponse.status).send(errorResponse);
};
