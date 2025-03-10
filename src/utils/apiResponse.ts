import { Request, Response } from "express";
import log from "./logger";

interface ISuccessResponse {
  success: true;
  data?: object | Array<object>;
  message?: string;
}

interface ISuccessResponseParameters {
  res: Response;
  data?: object | Array<object>;
  message?: string;
  statusCode?: number;
}

export function sendSuccessResponse({
  res,
  data,
  message = "",
  statusCode = 200,
}: ISuccessResponseParameters) {
  const isDataArray = Array.isArray(data);

  const response: ISuccessResponse = {
    success: true,
  };

  if (data) {
    response.data = data;
  }
  if (message && message.length > 0) {
    response.message = message;
  }
  res.status(statusCode).json(response);
}

interface IErrorResponse {
  success: false;
  error?: any;
}

interface IErrorResponseParameters {
  req: Request;
  res: Response;
  error?: any;
  statusCode?: number;
}

export function errorResponse({
  req,
  res,
  error,
  statusCode = 400,
}: IErrorResponseParameters) {
  const response: IErrorResponse = {
    success: false,
  };

  if (!error) {
    response.error = "Something went wrong";
    statusCode = 500;
  } else if (typeof error === "string") {
    response.error = error;
  }

  log.error(`Error in ${req.originalUrl}: ${response.error}`);

  res.status(statusCode).json(response);
}
