import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserService } from "./user.service.js";
import { controller, httpPost } from "inversify-express-utils";
import { TYPE } from "../types.js";
import { sessionCheckMiddleware } from "../../global/middlewares/sessionCheckMiddleware.js";
import { validateBodyMiddleware } from "../../global/middlewares/validateBodyMiddleware.js";
import { SignupRequestDto } from "./dto/signup.dto.js";

@controller("/api/users")
export class UserController {
  constructor(@inject(TYPE.UserService) private userService: UserService) {}

  @httpPost("/signup", validateBodyMiddleware(SignupRequestDto))
  public async signup(req: Request<{}, {}, SignupRequestDto>, res: Response) {
    const result = await this.userService.signup(req.body);
    req.session.userId = result.id;
    req.session.name = result.name;
    return res.status(StatusCodes.CREATED).json(result);
  }

  @httpPost("/login", validateBodyMiddleware(SignupRequestDto))
  public async login(req: Request<{}, {}, SignupRequestDto>, res: Response) {
    const result = await this.userService.login(req.body);
    req.session.userId = result.id;
    req.session.name = result.name;
    return res.status(StatusCodes.OK).json(result);
  }

  @httpPost("/logout", sessionCheckMiddleware)
  public async logout(req: Request, res: Response) {
    await new Promise((resolve, _) => req.session.destroy(resolve));
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}
