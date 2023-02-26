import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { UserRepository } from "./repositories/user.repository.js";
import { SignupRequestDto, SignupResponseDto } from "./dto/signup.dto.js";
import { User } from "./entities/user.entity.js";
import { UserErrorCode } from "./user.error.js";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto.js";

@injectable()
export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async signup(request: SignupRequestDto): Promise<SignupResponseDto> {
    const exists: boolean = await this.userRepository.existsByName(
      request.name
    );
    if (exists) {
      throw UserErrorCode.DUPLICATE_NAME;
    }

    const user = await User.create(
      request.name,
      request.name,
      request.password
    );
    await this.userRepository.save(user);

    return SignupResponseDto.from(user);
  }

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByName(request.name);
    if (user == null) {
      throw UserErrorCode.LOGIN_FAILED;
    }

    const matches = await bcrypt.compare(request.password, user.password);
    if (!matches) {
      throw UserErrorCode.LOGIN_FAILED;
    }

    return LoginResponseDto.from(user);
  }
}
