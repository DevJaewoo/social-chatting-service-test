import { Exclude, Expose } from "class-transformer";
import { TFriendStatus } from "../../../global/constants";
import { Friend } from "../entities/friend.entity.js";

export class AddFriendResponseDto {
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

  public static from(friend: Friend): AddFriendResponseDto {
    const signupResponseDto = new AddFriendResponseDto();
    signupResponseDto._requestId = friend.id;
    signupResponseDto._userId = friend.friendId;
    signupResponseDto._status = friend.friendStatus;
    return signupResponseDto;
  }
}
