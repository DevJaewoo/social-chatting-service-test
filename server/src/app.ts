import express, { Request, Response } from "express";
import path from "path";

const __dirname = path.resolve();
const FRONTEND_DIR = "/build";

const app = express();
const port = 5000;

app.use("/", express.static(path.join(__dirname, FRONTEND_DIR)));

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
