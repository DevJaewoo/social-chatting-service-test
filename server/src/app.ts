import "./dotenv.js";
import express, { Request, Response } from "express";
import path from "path";
import { AppDataSource } from "./data-source.js";

const __dirname = path.resolve();
const FRONTEND_DIR = "/build";

const app = express();
const port = 5000;

const initializeExpress = () => {
  app.use("/", express.static(path.join(__dirname, FRONTEND_DIR)));

  app.get("/", (_: Request, res: Response) => {
    res.sendFile("index.html");
  });

  app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
};

AppDataSource.initialize()
  .then(async () => {
    initializeExpress();
  })
  .catch((error) => console.log(error));
