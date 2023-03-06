import { injectable } from "inversify";
import { DirectChatListDto } from "./dto/direct-chat-list.dto.js";
import { DirectChatRepository } from "./repositories/direct-chat.repository.js";
import { DirectUserRepository } from "./repositories/direct-user.repository.js";
import { Direct } from "./entities/direct.entity.js";
import { UserRepository } from "../user/repositories/user.repository.js";
import { UserErrorCode } from "../user/user.error.js";
import { DirectErrorCode } from "./direct.error.js";
import { DirectRepository } from "./repositories/direct.repository.js";

@injectable()
export class DirectService {
  private userRepository;
  private directRepository;
  private directUserRepository;
  private directChatRepository;

  constructor() {
    this.userRepository = UserRepository;
    this.directRepository = DirectRepository;
    this.directUserRepository = DirectUserRepository;
    this.directChatRepository = DirectChatRepository;
  }

  async getDirectChatList(
    userId: number,
    friendId: number
  ): Promise<DirectChatListDto> {
    if (userId === friendId) {
      throw DirectErrorCode.SELF_REQUEST;
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const friend = await this.userRepository.findById(friendId);
    if (!friend) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const directUser = await this.directUserRepository.findByEachUserId(
      userId,
      friendId
    );

    // 처음 채팅
    if (!directUser) {
      const direct = Direct.create([user, friend]);
      await this.directRepository.save(direct);

      return DirectChatListDto.create(direct.id, []);
    } else {
      const chatList = await this.directChatRepository.findAllByDirectId(
        directUser.directId
      );
      return DirectChatListDto.create(directUser.directId, chatList);
    }
  }
}
