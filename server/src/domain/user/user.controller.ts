import { Request, Response, Router } from "express";
import { inject } from "inversify";
import { UserService } from "./user.service.js";
import { controller, httpPost } from "inversify-express-utils";
import { TYPE } from "../../types.js";
import { sessionCheckMiddleware } from "./../../middlewares/sessionCheckMiddleware.js";
import { validateBodyMiddleware } from "../../middlewares/validateBodyMiddleware.js";
import { SignupRequestDto } from "./dto/SignupRequestDto.js";

@controller("/api/users")
export class UserController {
  constructor(@inject(TYPE.UserService) private userService: UserService) {}

  @httpPost("/signup", validateBodyMiddleware(SignupRequestDto))
  public async test(req: Request<{}, {}, SignupRequestDto>, res: Response) {}
}
