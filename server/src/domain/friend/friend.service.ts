import { injectable } from "inversify";
import { UserRepository } from "../user/repositories/user.repository.js";
import { UserErrorCode } from "../user/user.error.js";
import { FriendListResponseDto } from "./dto/friend-list.dto.js";
import { FriendRepository } from "./repositories/friend.repository.js";
import { AddFriendResponseDto } from "./dto/add-friend.dto.js";
import { FriendStatus } from "../../global/constants.js";
import { FriendErrorCode } from "./friend.error.js";
import { Friend } from "./entities/friend.entity.js";
import { AddRequestListResponseDto } from "./dto/add-request-list.dto.js";
import {
  AcceptFriendRequestDto,
  AcceptFriendResponseDto,
} from "./dto/accept-friend.dto.js";

@injectable()
export class FriendService {
  private userRepository;
  private friendRepository;

  constructor() {
    this.userRepository = UserRepository;
    this.friendRepository = FriendRepository;
  }

  async getFriendList(currentUserId: number): Promise<FriendListResponseDto> {
    const friends = await this.friendRepository.findAllByUserId(currentUserId);
    return FriendListResponseDto.from(friends);
  }

  async addFriend(
    currentUserId: number,
    friendUserId: number
  ): Promise<AddFriendResponseDto> {
    if (currentUserId === friendUserId) {
      throw FriendErrorCode.SELF_REQUEST;
    }

    const user = await this.userRepository.findById(currentUserId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const friendUser = await this.userRepository.findById(friendUserId);
    if (friendUser === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    let friend = await this.friendRepository.findByUserId(
      currentUserId,
      friendUserId
    );

    // 이미 친구요청을 보냈거나, 친구이거나, 상대방이 거절했을 때
    if (friend && friend.friendStatus !== FriendStatus.NONE) {
      throw FriendErrorCode.INVALID_ADD_REQUEST;
    }

    if (friend === null) {
      friend = Friend.create(user, friendUser);
    }

    friend.friendStatus = FriendStatus.REQUESTED;
    await this.friendRepository.save(friend);

    return AddFriendResponseDto.from(friend);
  }

  async deleteFriend(currentUserId: number, friendUserId: number) {
    if (currentUserId === friendUserId) {
      throw FriendErrorCode.SELF_REQUEST;
    }

    let friend = await this.friendRepository.findByUserId(
      currentUserId,
      friendUserId
    );

    // 사용자를 찾을 수 없거나, 친구 상태가 아닐 때
    if (!friend || friend.friendStatus !== FriendStatus.ACCEPTED) {
      throw FriendErrorCode.INVALID_DELETE_REQUEST;
    }

    let inverse = await this.friendRepository.findByUserId(
      friendUserId,
      currentUserId
    );

    // 사용자를 찾을 수 없거나, 친구 상태가 아닐 때
    if (!inverse || inverse.friendStatus !== FriendStatus.ACCEPTED) {
      throw FriendErrorCode.INVALID_DELETE_REQUEST;
    }

    friend.friendStatus = FriendStatus.NONE;
    inverse.friendStatus = FriendStatus.NONE;
    await this.friendRepository.save(friend);
    await this.friendRepository.save(inverse);

    // no-content
  }

  async getAddRequestList(
    currentUserId: number
  ): Promise<AddRequestListResponseDto> {
    const friends = await this.friendRepository.findAllRequestsByUserId(
      currentUserId
    );
    return AddRequestListResponseDto.from(friends);
  }

  async acceptFriend(
    currentUserId: number,
    friendUserId: number,
    request: AcceptFriendRequestDto
  ): Promise<AcceptFriendResponseDto> {
    if (currentUserId === friendUserId) {
      throw FriendErrorCode.SELF_REQUEST;
    }

    if (
      ![
        FriendStatus.ACCEPTED,
        FriendStatus.REJECTED,
        FriendStatus.BLOCKED,
      ].find((s) => s === request.status)
    ) {
      throw FriendErrorCode.INVALID_ACCEPT_TYPE;
    }

    const user = await this.userRepository.findById(currentUserId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const friendUser = await this.userRepository.findById(friendUserId);
    if (friendUser === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    let friend = await this.friendRepository.findByUserId(
      friendUserId,
      currentUserId
    );

    // 사용자를 찾을 수 없거나, 친구 상태가 아닐 때
    if (!friend || friend.friendStatus !== FriendStatus.REQUESTED) {
      throw FriendErrorCode.INVALID_ACCEPT_REQUEST;
    }

    if (request.status !== FriendStatus.ACCEPTED) {
      friend.friendStatus = request.status;
      await this.friendRepository.save(friend);
    } else {
      let inverse = await this.friendRepository.findByUserId(
        currentUserId,
        friendUserId
      );

      if (inverse === null) {
        inverse = Friend.create(user, friendUser);
      }

      inverse.friendStatus = FriendStatus.ACCEPTED;
      friend.friendStatus = FriendStatus.ACCEPTED;

      await this.friendRepository.save(friend);
      await this.friendRepository.save(inverse);
    }

    return AcceptFriendResponseDto.from(friend);
  }
}
