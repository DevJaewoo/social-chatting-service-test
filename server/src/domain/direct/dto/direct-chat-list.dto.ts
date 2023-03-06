import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, Length, Min } from "class-validator";
import { DirectChat } from "../entities/direct-chat.entity.js";

export class DirectChatRequestDto {
  @IsNumber()
  @Min(1)
  readonly directId: number;

  @IsString()
  @Length(1)
  readonly message: string;
}

export class DirectChatListDto {
  @Exclude() private _directId: number;
  @Exclude() private _directChatList: DirectChatDto[];

  private constructor() {}

  @Expose()
  public directId() {
    return this._directId;
  }

  @Expose()
  public directChatList() {
    return this._directChatList;
  }

  public static create(
    directId: number,
    directChatList: DirectChat[]
  ): DirectChatListDto {
    const directChatListDto = new DirectChatListDto();
    directChatListDto._directId = directId;
    directChatListDto._directChatList = directChatList.map((d) =>
      DirectChatDto.create(d)
    );

    return directChatListDto;
  }
}

export class DirectChatDto {
  @Exclude() private _userId: number;
  @Exclude() private _message: string;
  @Exclude() private _createdAt: Date;

  private constructor() {}

  @Expose()
  public userId() {
    return this._userId;
  }

  @Expose()
  public message() {
    return this._message;
  }

  @Expose()
  public createdAt() {
    return this._createdAt;
  }

  public static create(directChat: DirectChat): DirectChatDto {
    const directChatDto = new DirectChatDto();
    directChatDto._userId = directChat.userId;
    directChatDto._message = directChat.message;
    directChatDto._createdAt = directChat.createdAt;

    return directChatDto;
  }
}
