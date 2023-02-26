import { StatusCodes } from "http-status-codes";

export class RestApiException {
  private readonly status: StatusCodes;
  private readonly code: string;
  private readonly message: string;

  constructor(code: string, status: StatusCodes, message: string) {
    this.status = status;
    this.code = code;
    this.message = message;
  }

  public getStatus() {
    return this.status;
  }

  public getBody() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export type ErrorCode = { [key: string]: RestApiException };
