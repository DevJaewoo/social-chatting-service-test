import "./dotenv.js";
import express, { Request, Response } from "express";
import path from "path";
import { AppDataSource } from "./data-source.js";
import { User } from "./domain/user/entity/User.js";

const __dirname = path.resolve();
const FRONTEND_DIR = "/build";

const app = express();
const port = 5000;

app.use("/", express.static(path.join(__dirname, FRONTEND_DIR)));

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html");
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
