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
} as const;
