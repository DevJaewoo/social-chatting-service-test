export interface ClientEvent {
  login: (userInfo: UserInfo) => void;
  roomList: () => void;
  roomInfo: (name: string) => void;
  roomCreate: (name: string) => void;
  roomEnter: (roomName: string) => void;
}

export interface ServerEvent {
  error: (error: string) => void;
  roomList: (roomList: PublicRoomListInfo[]) => void;
  roomInfo: (roomInfo: PublicRoomInfo) => void;
  roomEnter: (roomInfo: PublicRoomInfo) => void;
}

export interface InternalEvent {}

export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
}

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
