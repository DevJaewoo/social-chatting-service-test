import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { inject } from "inversify";
import { instanceToPlain } from "class-transformer";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPatch,
  httpPut,
} from "inversify-express-utils";
import { TYPE } from "../types.js";
import { sessionCheckMiddleware } from "../../global/middlewares/sessionCheckMiddleware.js";
import { validateBodyMiddleware } from "../../global/middlewares/validateBodyMiddleware.js";
import { FriendService } from "./friend.service.js";

@controller("/api/friends")
export class FriendController {
  constructor(
    @inject(TYPE.FriendService) private friendService: FriendService
  ) {}

  @httpGet("", sessionCheckMiddleware)
  public async getFriendList(req: Request, res: Response) {
    // userId session은 middleware에서 검사됨
    const userList = await this.friendService.getFriendList(
      req.session.userId ?? 0
    );
    return res.status(StatusCodes.OK).send(instanceToPlain(userList));
  }

  @httpPut("/:friendId", sessionCheckMiddleware)
  public async addFriend(req: Request, res: Response) {
    const result = await this.friendService.addFriend(
      req.session.userId ?? 0,
      parseInt(req.params.friendId) ?? 0
    );
    return res.status(StatusCodes.OK).send(instanceToPlain(result));
  }

  @httpDelete("", sessionCheckMiddleware)
  public async deleteFriend(req: Request, res: Response) {
    const followerList = await this.friendService.getFriendList(
      parseInt(req.params.userId) ?? 0
    );
    return res.status(StatusCodes.OK).send(instanceToPlain(followerList));
  }
}
