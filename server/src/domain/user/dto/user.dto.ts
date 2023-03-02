import { Exclude, Expose } from "class-transformer";
import { User } from "../entities/user.entity.js";

export class UserResponseDto {
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _nickname: string;

  @Exclude() private _friends: number;
  @Exclude() private _followers: number;
  @Exclude() private _following: number;

  @Exclude() private _createdAt: Date;

  private constructor() {}

  @Expose() public get id() {
    return this._id;
  }

  @Expose() public get name() {
    return this._name;
  }

  @Expose() public get nickname() {
    return this._nickname;
  }

  @Expose() public get friends() {
    return this._friends;
  }

  @Expose() public get followers() {
    return this._followers;
  }

  @Expose() public get following() {
    return this._following;
  }

  @Expose() public get createdAt() {
    return this._createdAt;
  }

  public static from(user: User): UserResponseDto {
    const userResponseDto = new UserResponseDto();

    userResponseDto._id = user.id;
    userResponseDto._name = user.name;
    userResponseDto._nickname = user.nickname;

    userResponseDto._friends = user.friends.length;
    userResponseDto._followers = user.followers.length;
    userResponseDto._following = user.followees.length;

    userResponseDto._createdAt = user.createdAt;

    return userResponseDto;
  }
}
