export interface ClientEvent {
  login: (userInfo: UserInfo) => void;
}

export interface ServerEvent {}
export interface InternalEvent {}

export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
}
