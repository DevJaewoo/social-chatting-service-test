import { ErrorRequestHandler } from "express";
import { CommonErrorCode } from "../exception/commonErrorCode.js";
import { RestApiException } from "../exception/errorCode.js";

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
    // RestApiException 처리
    if (err instanceof RestApiException) {
      return res.status(err.getStatus()).json(err.getBody());
    }

    // 다른 예외일 경우 INTERNAL SERVER ERROR
    console.error(err);

    const error = CommonErrorCode.INTERNAL_SERVER_ERROR;
    return res.status(error.getStatus()).json(error.getBody());
  } catch (err) {
    // 예외 처리 중 Exception 발생 시 다음 미들웨어로 전송
    return next(err);
  }
};
