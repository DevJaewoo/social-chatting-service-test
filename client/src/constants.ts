import { UserInfo } from "./stores/useCurrentUserInfo";

export interface ErrorCode {
  code: string;
  message: string;
}

export interface ClientEvent {
  login: (userInfo: UserInfo) => void;
  roomList: () => void;
  roomInfo: (id: number) => void;
  roomCreate: (name: string) => void;
  roomEnter: (roomName: string) => void;
}

export interface ServerEvent {
  error: (error: string) => void;

  // Room 관련
  roomList: (roomList: PublicRoomListInfo[]) => void;
  roomInfo: (roomInfo: PublicRoomInfo) => void;
  roomEnter: (roomInfo: PublicRoomInfo) => void;

  // Chatting 관련
  roomNotice: (notice: RoomNotice) => void;
}

export interface InternalEvent {}

export interface PublicRoomInfo {
  id: number;
  name: string;
  users: UserInfo[];
}

export interface PublicRoomListInfo {
  id: number;
  name: string;
  participants: number;
}

export const NoticeType = {
  USER_ENTER: "USER_ENTER",
  USER_LEAVE: "USER_LEAVE",
} as const;

export type TNoticeType = (typeof NoticeType)[keyof typeof NoticeType];

export interface RoomNotice {
  roomId: number;
  type: TNoticeType;
  user: UserInfo;
}
