import { SignupRequestDto } from "./dto/SignupDto";
import { injectable } from "inversify";
import { UserRepository } from "./repositories/user.repository.js";
import { User } from "./entities/user.entity";

@injectable()
export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async signup(request: SignupRequestDto) {}
}
