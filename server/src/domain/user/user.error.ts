import { StatusCodes } from "http-status-codes";
import {
  ErrorCode,
  RestApiException,
} from "../../global/exception/errorCode.js";

export const UserErrorCode: ErrorCode = {
  DUPLICATE_NAME: new RestApiException(
    "DUPLICATE_NAME",
    StatusCodes.CONFLICT,
    "중복된 이름이 존재합니다."
  ),

  LOGIN_FAILED: new RestApiException(
    "LOGIN_FAILED",
    StatusCodes.UNAUTHORIZED,
    "아이디 / 비밀번호를 확인해주세요."
  ),
} as const;
