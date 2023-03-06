import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
} from "inversify-express-utils";
import { sessionCheckMiddleware } from "../../global/middlewares/sessionCheckMiddleware.js";
import { TYPE } from "../types.js";
import { DirectService } from "./direct.service.js";
import { DirectChatRequestDto } from "./dto/direct-chat-list.dto.js";

@controller("/api/directs")
export class DirectController {
  constructor(
    @inject(TYPE.DirectService) private directService: DirectService
  ) {}

  @httpGet("/:friendId", sessionCheckMiddleware)
  public async getdirectList(req: Request, res: Response) {
    // userId session은 middleware에서 검사됨
    const chatList = await this.directService.getDirectChatList(
      req.session.userId ?? 0,
      parseInt(req.params.friendId) ?? 0
    );
    return res.status(StatusCodes.OK).send(instanceToPlain(chatList));
  }

  @httpPost("", sessionCheckMiddleware)
  public async chat(
    @request() req: Request<{}, {}, DirectChatRequestDto>,
    @response() res: Response
  ) {
    // userId session은 middleware에서 검사됨
    const result = await this.directService.chat(
      req.session.userId ?? 0,
      req.body
    );
    return res.status(StatusCodes.OK).send(instanceToPlain(result));
  }
}
