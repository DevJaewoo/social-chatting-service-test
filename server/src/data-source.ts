import "reflect-metadata";
import { DataSource } from "typeorm";
import { DirectChat } from "./domain/direct/entities/direct-chat.entity.js";
import { DirectUser } from "./domain/direct/entities/direct-user.entity.js";
import { Direct } from "./domain/direct/entities/direct.entity.js";
import { User } from "./domain/user/entities/user.entity.js";
import { Follow } from "./domain/follow/entities/follow.entity.js";
import { Friend } from "./domain/friend/entities/friend.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  synchronize: true,
  logging: true,
  entities: [User, Direct, DirectUser, DirectChat, Follow, Friend],
  migrations: [],
  subscribers: [],
});
