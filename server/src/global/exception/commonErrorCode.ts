import { StatusCodes } from "http-status-codes";
import { ErrorCode, RestApiException } from "./errorCode.js";

export const CommonErrorCode: ErrorCode = {
  UNAUTHORIZED: new RestApiException(
    "UNAUTHORIZED",
    StatusCodes.UNAUTHORIZED,
    "인증되지 않은 사용자입니다."
  ),

  FORBIDDEN: new RestApiException(
    "FORBIDDEN",
    StatusCodes.FORBIDDEN,
    "리소스에 접근할 권한이 없습니다."
  ),

  NOT_FOUND: new RestApiException(
    "RESOURCE_NOT_FOUND",
    StatusCodes.NOT_FOUND,
    "리소스를 찾을 수 없습니다."
  ),

  INTERNAL_SERVER_ERROR: new RestApiException(
    "INTERNAL_SERVER_ERROR",
    StatusCodes.INTERNAL_SERVER_ERROR,
    "서버에 문제가 발생했습니다."
  ),
} as const;
