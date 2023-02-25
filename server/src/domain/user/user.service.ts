import { injectable } from "inversify";
import { UserRepository } from "./repositories/user.repository.js";

@injectable()
export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async findByName(name: string) {
    return await this.userRepository.findByName(name);
  }
}
