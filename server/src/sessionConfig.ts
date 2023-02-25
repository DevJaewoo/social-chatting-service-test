import session, * as expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";
import mysql2 from "mysql2/promise";
import { RequestHandler } from "express";

declare module "express-session" {
  export interface SessionData {
    userId: number;
    name: string;
  }
}

export const setupSession = () => {
  const poolOptions: mysql2.PoolOptions = {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_DATABASE || "test",
  };

  const MySQLStore = expressMySqlSession(expressSession);
  const connection = mysql2.createPool(poolOptions);
  const sessionStore = new MySQLStore({}, connection);

  const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: Number(process.env.SESSION_MAXAGE) || 36000000 },
  });

  return sessionMiddleware;
};

export const sessionCheckMiddleware: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      status: "UNAUTHORIZED",
      message: "Please Login",
    });
  }
  next();
};
