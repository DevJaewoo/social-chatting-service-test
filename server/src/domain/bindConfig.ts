import { Container } from "inversify";
import { UserController } from "./user/user.controller.js";
import { UserService } from "./user/user.service.js";
import { FriendController } from "./friend/friend.controller.js";
import { FriendService } from "./friend/friend.service.js";
import { TYPE } from "./types.js";

export const bindComponents = (container: Container) => {
  bindUserComponents(container);
};

const bindUserComponents = (container: Container) => {
  container.bind<UserController>(TYPE.UserController).to(UserController);
  container
    .bind<UserService>(TYPE.UserService)
    .to(UserService)
    .inSingletonScope();

  container.bind<FriendController>(TYPE.FriendController).to(FriendController);
  container
    .bind<FriendService>(TYPE.FriendService)
    .to(FriendService)
    .inSingletonScope();
};
