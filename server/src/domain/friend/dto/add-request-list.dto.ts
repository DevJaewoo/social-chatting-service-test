import { Exclude, Expose } from "class-transformer";
import { Friend } from "../entities/friend.entity.js";

export class AddRequestListResponseDto {
  @Exclude() private _addRequestList: AddRequestListItemResponseDto[];

  private constructor() {}

  @Expose() public get addRequestList() {
    return this._addRequestList;
  }

  public static from(addRequestList: Friend[]) {
    const userListDto = new AddRequestListResponseDto();

    userListDto._addRequestList = addRequestList
      .filter((f) => f.friend)
      .map((friend) => {
        // TODO: O(n)으로 개선
        return AddRequestListItemResponseDto.from(friend);
      });

    return userListDto;
  }
}

export class AddRequestListItemResponseDto {
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

  public static from(friend: Friend): AddRequestListItemResponseDto {
    const friendsDto = new AddRequestListItemResponseDto();

    friendsDto._id = friend.friend.id;
    friendsDto._name = friend.friend.name;
    friendsDto._nickname = friend.friend.nickname;
    friendsDto._createdAt = friend.friend.createdAt;

    return friendsDto;
  }
}
