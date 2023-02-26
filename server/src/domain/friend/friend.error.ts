import { StatusCodes } from "http-status-codes";
import {
  ErrorCode,
  RestApiException,
} from "../../global/exception/errorCode.js";

export const FriendErrorCode: ErrorCode = {
  INVALID_ADD_REQUEST: new RestApiException(
    "INVALID_ADD_REQUEST",
    StatusCodes.BAD_REQUEST,
    "이미 친구 요청을 보냈거나, 친구 요청을 보낼 수 없는 상태입니다."
  ),
  INVALID_DELETE_REQUEST: new RestApiException(
    "INVALID_DELETE_REQUEST",
    StatusCodes.BAD_REQUEST,
    "사용자가 존재하지 않거나, 친구 상태가 아닙니다."
  ),
  INVALID_ACCEPT_REQUEST: new RestApiException(
    "INVALID_ACCEPT_REQUEST",
    StatusCodes.BAD_REQUEST,
    "친구 요청이 존재하지 않거나, 수락/거절할 수 없는 상태입니다."
  ),
  INVALID_ACCEPT_TYPE: new RestApiException(
    "INVALID_ACCEPT_TYPE",
    StatusCodes.BAD_REQUEST,
    "지원하지 않는 친구 요청 처리 종류입니다."
  ),
  SELF_REQUEST: new RestApiException(
    "SELF_REQUEST",
    StatusCodes.BAD_REQUEST,
    "자신을 대상으로 할 수 없습니다."
  ),
} as const;
