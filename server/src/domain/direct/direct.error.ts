import { StatusCodes } from "http-status-codes";
import {
  ErrorCode,
  RestApiException,
} from "../../global/exception/errorCode.js";

export const DirectErrorCode: ErrorCode = {
  SELF_REQUEST: new RestApiException(
    "SELF_REQUEST",
    StatusCodes.BAD_REQUEST,
    "자신과 대화를 나눌 수 없습니다."
  ),
} as const;
