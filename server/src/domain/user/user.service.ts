import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { UserRepository } from "./repositories/user.repository.js";
import { FriendRepository } from "./../friend/repositories/friend.repository.js";
import { FollowRepository } from "../follow/repositories/follow.repository.js";
import { SignupRequestDto, SignupResponseDto } from "./dto/signup.dto.js";
import { User } from "./entities/user.entity.js";
import { CommonErrorCode } from "./../../global/exception/commonErrorCode.js";
import { UserErrorCode } from "./user.error.js";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto.js";
import { UserListResponseDto as UserListResponseDto } from "./dto/user-list.dto.js";
import { UserResponseDto } from "./dto/user.dto.js";
import { FriendListResponseDto } from "../friend/dto/friend-list.dto.js";
import { FollowerListResponseDto } from "../follow/dto/follower-list.dto.js";
import { FolloweeListResponseDto } from "../follow/dto/followee-list.dto.js";

@injectable()
export class UserService {
  private userRepository;
  private friendRepository;
  private followRepository;

  constructor() {
    this.userRepository = UserRepository;
    this.friendRepository = FriendRepository;
    this.followRepository = FollowRepository;
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

  async getUserList(currentUserId: number): Promise<UserListResponseDto> {
    const currentUser = await this.userRepository.findByIdWithRelationship(
      currentUserId
    );
    if (currentUser === null) {
      throw CommonErrorCode.UNAUTHORIZED;
    }

    const userList = await this.userRepository.find();
    return UserListResponseDto.from(currentUser, userList);
  }

  async getUser(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findByIdWithRelationship(userId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    return UserResponseDto.from(user);
  }

  async getUserFriends(userId: number): Promise<FriendListResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const friends = await this.friendRepository.findAllByUserId(userId);
    return FriendListResponseDto.from(friends);
  }

  async getUserFollowers(userId: number): Promise<FollowerListResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const followers = await this.followRepository.findAllFollowersByUserId(
      userId
    );

    return FollowerListResponseDto.from(followers);
  }

  async getUserFollowees(userId: number): Promise<FolloweeListResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (user === null) {
      throw UserErrorCode.USER_NOT_FOUND;
    }

    const followers = await this.followRepository.findAllFolloweesByUserId(
      userId
    );

    return FolloweeListResponseDto.from(followers);
  }
}
