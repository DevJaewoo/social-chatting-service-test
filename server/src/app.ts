import "./dotenv.js";
import express from "express";
import path from "path";
import http from "http";
import { AppDataSource } from "./data-source.js";
import { sessionConfigMiddleware } from "./global/middlewares/sessionConfigMiddleware.js";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindComponents } from "./domain/bindConfig.js";
import { globalExceptionHandler } from "./global/middlewares/globalExceptionHandler.js";
import { requestLoggingMiddleware } from "./global/middlewares/requestLoggingMiddleware.js";
import webSocketServer from "./websocket/webSocketServer.js";

const __dirname = path.resolve();
const FRONTEND_DIR = "/dist/build";

// const app = express();
const port = 5000;

const initializeExpress = () => {
  const container = new Container();
  bindComponents(container);

  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(sessionConfigMiddleware());
    app.use(requestLoggingMiddleware);
    app.use("/", express.static(path.join(__dirname, FRONTEND_DIR)));
  });

  server.setErrorConfig((app) => {
    app.use(globalExceptionHandler);
  });

  const app = server.build();
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, FRONTEND_DIR, "index.html"));
  });

  const httpServer = http.createServer(app);
  webSocketServer(httpServer);

  httpServer.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
};

AppDataSource.initialize()
  .then(async () => {
    initializeExpress();
  })
  .catch((error) => console.log(error));
