import { RequestHandler } from "express";
import { CommonErrorCode } from "../exception/commonErrorCode.js";

export const sessionCheckMiddleware: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    throw CommonErrorCode.UNAUTHORIZED;
  }
  next();
};
