import { StatusCodes } from "http-status-codes";
import {
  ErrorCode,
  RestApiException,
} from "../../global/exception/errorCode.js";

export const FriendErrorCode: ErrorCode = {
  INVALID_REQUEST: new RestApiException(
    "INVALID_REQUEST",
    StatusCodes.BAD_REQUEST,
    "이미 친구 요청을 보냈거나, 친구 요청을 보낼 수 없는 상태입니다."
  ),
  SELF_REQUEST: new RestApiException(
    "SELF_REQUEST",
    StatusCodes.BAD_REQUEST,
    "자신에게 친구 요청을 보낼 수 없습니다."
  ),
} as const;
