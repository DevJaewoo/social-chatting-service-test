import { Exclude, Expose } from "class-transformer";
import {
  FollowStatus,
  FriendStatus,
  TFollowStatus,
  TFriendStatus,
} from "../../../global/constants.js";
import { User } from "../entities/user.entity.js";

export class UserListResponseDto {
  @Exclude() private _userList: UserListItemResponseDto[];

  private constructor() {}

  @Expose() public get userList() {
    return this._userList;
  }

  public static from(currentUser: User, userList: User[]) {
    const userListDto = new UserListResponseDto();

    console.log(currentUser.friends);
    userListDto._userList = userList.map((user) => {
      // TODO: O(n)으로 개선
      const friendStatus =
        currentUser.friends.find((f) => f.friendId === user.id)?.friendStatus ??
        FriendStatus.NONE;
      const followStatus =
        currentUser.followees.find((f) => f.followeeId === user.id)
          ?.followStatus ?? FollowStatus.NONE;
      return UserListItemResponseDto.from(user, friendStatus, followStatus);
    });

    return userListDto;
  }
}

export class UserListItemResponseDto {
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _nickname: string;
  @Exclude() private _friendStatus: TFriendStatus;
  @Exclude() private _followStatus: TFollowStatus;
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

  @Expose() public get friendStatus() {
    return this._friendStatus;
  }

  @Expose() public get followStatus() {
    return this._followStatus;
  }

  @Expose() public get createdAt() {
    return this._createdAt;
  }

  public static from(
    user: User,
    friendStatus: TFriendStatus,
    followStatus: TFollowStatus
  ): UserListItemResponseDto {
    const userListItemDto = new UserListItemResponseDto();

    userListItemDto._id = user.id;
    userListItemDto._name = user.name;
    userListItemDto._nickname = user.nickname;
    userListItemDto._createdAt = user.createdAt;

    userListItemDto._friendStatus = friendStatus;
    userListItemDto._followStatus = followStatus;

    return userListItemDto;
  }
}
