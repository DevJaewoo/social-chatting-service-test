import { injectable } from "inversify";
import { UserRepository } from "./repositories/user.repository.js";
import { SignupRequestDto, SignupResponseDto } from "./dto/signup.dto.js";
import { User } from "./entities/user.entity.js";
import { UserErrorCode } from "./user.error.js";

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
}
