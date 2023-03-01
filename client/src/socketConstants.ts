import { UserInfo } from "./stores/useCurrentUserInfo";

export interface ErrorCode {
  code: string;
  message: string;
}

export interface ClientEvent {
  login: (userInfo: UserInfo) => void;

  // Room 관련
  roomList: () => void;
  roomInfo: (name: number) => void;
  roomCreate: (name: string) => void;
  roomEnter: (roomName: string) => void;
  roomLeave: () => void;

  // Chatting 관련
  roomChat: (chat: RoomChatRequest) => void;

  // DM 관련
  directEnter: (userId: number) => void;
  directChat: (chat: DirectChatRequest) => void;
  directLeave: (userId: number) => void;
}

export interface ServerEvent {
  error: (error: string) => void;

  // Room 관련
  roomList: (roomList: PublicRoomListInfo[]) => void;
  roomInfo: (roomInfo: PublicRoomInfo) => void;
  roomEnter: (roomInfo: PublicRoomInfo) => void;
  roomLeave: () => void;

  // Chatting 관련
  roomNotice: (notice: RoomNotice) => void;
  roomChat: (chat: RoomChatResponse) => void;

  // DM 관련
  directEnter: (userId: number) => void;
  directChat: (chat: DirectChatResponse) => void;
  directLeave: (userId: number) => void;
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

export interface RoomChatRequest {
  roomName: string;
  message: string;
}

export interface RoomChatResponse {
  userId: number;
  message: string;
}

export interface DirectChatRequest {
  userId: number;
  message: string;
}

export interface DirectChatResponse {
  userId: number;
  message: string;
}
