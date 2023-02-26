import { RequestHandler } from "express";

export const sessionCheckMiddleware: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      status: "UNAUTHORIZED",
      message: "Please Login",
    });
  }
  next();
};
