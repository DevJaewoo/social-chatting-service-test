import { Exclude, Expose } from "class-transformer";
import { TFriendStatus } from "../../../global/constants.js";
import { Friend } from "../entities/friend.entity.js";

export class AcceptFriendRequestDto {
  readonly status: TFriendStatus;
}

export class AcceptFriendResponseDto {
  @Exclude() private _requestId: number;
  @Exclude() private _userId: number;
  @Exclude() private _status: TFriendStatus;

  private constructor() {}

  @Expose()
  public get requestId(): number {
    return this._requestId;
  }

  @Expose()
  public get userId(): number {
    return this._userId;
  }

  @Expose()
  public get status(): string {
    return this._status;
  }

  public static from(friend: Friend): AcceptFriendResponseDto {
    const addFriendResponseDto = new AcceptFriendResponseDto();
    addFriendResponseDto._requestId = friend.id;
    addFriendResponseDto._userId = friend.userId;
    addFriendResponseDto._status = friend.friendStatus;
    return addFriendResponseDto;
  }
}
