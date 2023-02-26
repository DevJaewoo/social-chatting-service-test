import { Exclude, Expose } from "class-transformer";
import { Follow } from "../entities/follow.entity.js";

export class FolloweeListResponseDto {
  @Exclude() private _followeeList: FolloweeListItemResponseDto[];

  private constructor() {}

  @Expose() public get followeeList() {
    return this._followeeList;
  }

  public static from(followeeList: Follow[]) {
    const userListDto = new FolloweeListResponseDto();

    userListDto._followeeList = followeeList
      .filter((f) => f.followee)
      .map((followee) => {
        // TODO: O(n)으로 개선
        return FolloweeListItemResponseDto.from(followee);
      });

    return userListDto;
  }
}

export class FolloweeListItemResponseDto {
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

  public static from(followee: Follow): FolloweeListItemResponseDto {
    const followeesDto = new FolloweeListItemResponseDto();

    followeesDto._id = followee.followee.id;
    followeesDto._name = followee.followee.name;
    followeesDto._nickname = followee.followee.nickname;
    followeesDto._createdAt = followee.followee.createdAt;

    return followeesDto;
  }
}
