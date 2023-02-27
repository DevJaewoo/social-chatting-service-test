import { Socket } from "socket.io";

export type ChatSocket = Socket<
  ClientEvent,
  ServerEvent,
  InternalEvent,
  UserInfo
>;

export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
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

export type TNoticeType = typeof NoticeType[keyof typeof NoticeType];

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
