import { Request, Response, Router } from "express";
import { inject } from "inversify";
import { UserService } from "./user.service.js";
import { controller, httpPost } from "inversify-express-utils";
import { TYPE } from "../../types.js";
import { sessionCheckMiddleware } from "../../sessionConfig.js";

interface SignupRequestDto {
  name: string;
  password: string;
}

@controller("/api/users")
export class UserController {
  constructor(@inject(TYPE.UserService) private userService: UserService) {}

  @httpPost("/")
  public async test(req: Request<{}, {}, SignupRequestDto>, res: Response) {
    const users = await this.userService.findByName(req.body.name);
    res.send(users);
  }
}
