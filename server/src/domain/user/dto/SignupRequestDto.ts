import { IsString, Length } from "class-validator";
import { USER_CONSTANT } from "../../constants.js";

export class SignupRequestDto {
  @IsString()
  @Length(USER_CONSTANT.MIN_NAME_LENGTH, USER_CONSTANT.MAX_NAME_LENGTH)
  name: string;

  @IsString()
  @Length(USER_CONSTANT.MIN_PASSWORD_LENGTH, USER_CONSTANT.MAX_PASSWORD_LENGTH)
  password: string;
}
