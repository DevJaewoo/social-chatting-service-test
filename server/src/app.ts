import "./dotenv.js";
import express from "express";
import path from "path";
import { AppDataSource } from "./data-source.js";
import { sessionConfigMiddleware } from "./global/middlewares/sessionConfigMiddleware.js";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindComponents } from "./domain/bindConfig.js";
import { globalExceptionHandler } from "./global/middlewares/globalExceptionHandler.js";
import { CommonErrorCode } from "./global/exception/commonErrorCode.js";

const __dirname = path.resolve();
const FRONTEND_DIR = "/build";

// const app = express();
const port = 5000;

const initializeExpress = () => {
  const container = new Container();
  bindComponents(container);

  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(sessionConfigMiddleware());
    app.use("/", express.static(path.join(__dirname, FRONTEND_DIR)));
  });

  server.setErrorConfig((app) => {
    app.use(globalExceptionHandler);
  });

  const app = server.build();

  app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
};

AppDataSource.initialize()
  .then(async () => {
    initializeExpress();
  })
  .catch((error) => console.log(error));
