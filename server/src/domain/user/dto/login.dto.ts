import { Exclude, Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { USER_CONSTANT } from "../../../global/constants.js";
import { User } from "../entities/user.entity.js";

export class LoginRequestDto {
  @IsString()
  @Length(USER_CONSTANT.MIN_NAME_LENGTH, USER_CONSTANT.MAX_NAME_LENGTH)
  readonly name: string;

  @IsString()
  @Length(USER_CONSTANT.MIN_PASSWORD_LENGTH, USER_CONSTANT.MAX_PASSWORD_LENGTH)
  readonly password: string;
}

export class LoginResponseDto {
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _nickname: string;
  @Exclude() private _createdAt: Date;

  private constructor() {}

  @Expose()
  public get id(): number {
    return this._id;
  }

  @Expose()
  public get name(): string {
    return this._name;
  }

  @Expose()
  public get nickname(): string {
    return this._nickname;
  }

  @Expose()
  public get createdAt(): Date {
    return this._createdAt;
  }

  public static from(user: User): LoginResponseDto {
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto._id = user.id;
    loginResponseDto._name = user.name;
    loginResponseDto._nickname = user.nickname;
    loginResponseDto._createdAt = user.createdAt;
    return loginResponseDto;
  }
}
