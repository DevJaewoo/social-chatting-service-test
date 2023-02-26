import { IsString, Length } from "class-validator";
import { USER_CONSTANT } from "../../../global/constants.js";

export class SignupRequestDto {
  @IsString()
  @Length(USER_CONSTANT.MIN_NAME_LENGTH, USER_CONSTANT.MAX_NAME_LENGTH)
  readonly name: string;

  @IsString()
  @Length(USER_CONSTANT.MIN_PASSWORD_LENGTH, USER_CONSTANT.MAX_PASSWORD_LENGTH)
  readonly password: string;
}

export class SignupResponseDto {
  private readonly id: number;
  private readonly name: string;
}
