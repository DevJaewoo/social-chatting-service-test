import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

export const validateBodyMiddleware = (schema: {
  new (): any;
}): RequestHandler => {
  return async (req, res, next) => {
    const target = plainToClass(schema, req.body);
    try {
      await validateOrReject(target);
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
};
