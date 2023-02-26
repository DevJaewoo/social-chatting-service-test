import { Request, Response, Router } from "express";
import { inject } from "inversify";
import { UserService } from "./user.service.js";
import { controller, httpPost } from "inversify-express-utils";
import { TYPE } from "../types.js";
import { sessionCheckMiddleware } from "../../global/middlewares/sessionCheckMiddleware.js";
import { validateBodyMiddleware } from "../../global/middlewares/validateBodyMiddleware.js";
import { SignupRequestDto } from "./dto/signupDto.js";

@controller("/api/users")
export class UserController {
  constructor(@inject(TYPE.UserService) private userService: UserService) {}

  @httpPost("/signup", validateBodyMiddleware(SignupRequestDto))
  public async signup(req: Request<{}, {}, SignupRequestDto>, res: Response) {
    await this.userService.signup(req.body);
  }

  @httpPost("/login", validateBodyMiddleware(SignupRequestDto))
  public async login(req: Request<{}, {}, SignupRequestDto>, res: Response) {}

  @httpPost("/logout", validateBodyMiddleware(SignupRequestDto))
  public async logout(req: Request<{}, {}, SignupRequestDto>, res: Response) {}
}
