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

    console.log(addRequestList);
    userListDto._addRequestList = addRequestList
      .filter((f) => f.user)
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

    friendsDto._id = friend.user.id;
    friendsDto._name = friend.user.name;
    friendsDto._nickname = friend.user.nickname;
    friendsDto._createdAt = friend.user.createdAt;

    return friendsDto;
  }
}
