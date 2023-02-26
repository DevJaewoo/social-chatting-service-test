import { IsString, Length } from "class-validator";
import { USER_CONSTANT } from "../../../global/constants.js";
import { User } from "./../entities/user.entity.js";

export class SignupRequestDto {
  @IsString()
  @Length(USER_CONSTANT.MIN_NAME_LENGTH, USER_CONSTANT.MAX_NAME_LENGTH)
  readonly name: string;

  @IsString()
  @Length(USER_CONSTANT.MIN_PASSWORD_LENGTH, USER_CONSTANT.MAX_PASSWORD_LENGTH)
  readonly password: string;
}

export class SignupResponseDto {
  private _id: number;
  private _name: string;
  private _nickname: string;
  private _createdAt: Date;

  private constructor() {}

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get nickname(): string {
    return this._nickname;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }

  public static from(user: User): SignupResponseDto {
    const signupResponseDto = new SignupResponseDto();
    signupResponseDto._id = user.id;
    signupResponseDto._name = user.name;
    signupResponseDto._nickname = user.nickname;
    signupResponseDto._createdAt = user.createdAt;
    return signupResponseDto;
  }
}
