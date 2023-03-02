import { RequestHandler } from "express";
import moment from "moment";

export const requestLoggingMiddleware: RequestHandler = (req, _, next) => {
  const datetime = moment().format("YYYY-MM-DD hh:mm:ss");
  console.log(
    `${datetime} Requested URL: ${req.url} ${JSON.stringify(req.body)}`
  );
  next();
};
