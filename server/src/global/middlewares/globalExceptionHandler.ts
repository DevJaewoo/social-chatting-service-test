import { ErrorRequestHandler, RequestHandler } from "express";
import { CommonErrorCode } from "../exception/commonErrorCode.js";
import { RestApiException } from "./../exception/errorCode.js";

/**
 * 모든 Exception에 대해 에러 처리하는 Middleware
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const globalExceptionHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  try {
    if (err instanceof RestApiException) {
      return res.status(err.getStatus()).json(err.getBody());
    }

    const error = CommonErrorCode.INTERNAL_SERVER_ERROR;
    return res.status(error.getStatus()).json(error.getBody());
  } catch (err) {
    return next(err);
  }
};
