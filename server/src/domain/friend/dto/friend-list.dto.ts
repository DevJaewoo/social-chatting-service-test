import { Exclude, Expose } from "class-transformer";
import { Friend } from "../entities/friend.entity.js";

export class FriendListResponseDto {
  @Exclude() private _friendList: FriendListItemResponseDto[];

  private constructor() {}

  @Expose() public get friendList() {
    return this._friendList;
  }

  public static from(friendList: Friend[]) {
    const userListDto = new FriendListResponseDto();

    userListDto._friendList = friendList
      .filter((f) => f.friend)
      .map((friend) => {
        // TODO: O(n)으로 개선
        return FriendListItemResponseDto.from(friend);
      });

    return userListDto;
  }
}

export class FriendListItemResponseDto {
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

  public static from(friend: Friend): FriendListItemResponseDto {
    const friendsDto = new FriendListItemResponseDto();

    friendsDto._id = friend.friend.id;
    friendsDto._name = friend.friend.name;
    friendsDto._nickname = friend.friend.nickname;
    friendsDto._createdAt = friend.friend.createdAt;

    return friendsDto;
  }
}
