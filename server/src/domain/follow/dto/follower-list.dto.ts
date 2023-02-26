import { Exclude, Expose } from "class-transformer";
import { Follow } from "../entities/follow.entity.js";

export class FollowerListResponseDto {
  @Exclude() private _followerList: FollowerListItemResponseDto[];

  private constructor() {}

  @Expose() public get followerList() {
    return this._followerList;
  }

  public static from(followerList: Follow[]) {
    const userListDto = new FollowerListResponseDto();

    userListDto._followerList = followerList
      .filter((f) => f.follower)
      .map((follower) => {
        // TODO: O(n)으로 개선
        return FollowerListItemResponseDto.from(follower);
      });

    return userListDto;
  }
}

export class FollowerListItemResponseDto {
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _nickname: string;
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

  @Expose() public get createdAt() {
    return this._createdAt;
  }

  public static from(follower: Follow): FollowerListItemResponseDto {
    const followersDto = new FollowerListItemResponseDto();

    followersDto._id = follower.follower.id;
    followersDto._name = follower.follower.name;
    followersDto._nickname = follower.follower.nickname;
    followersDto._createdAt = follower.follower.createdAt;

    return followersDto;
  }
}
