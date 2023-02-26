import { UserInfo } from "./stores/useCurrentUserInfo";

export interface ErrorCode {
  code: string;
  message: string;
}

export interface ClientEvent {
  login: (userInfo: UserInfo) => void;
}

export interface ServerEvent {}
export interface InternationalEvent {}
