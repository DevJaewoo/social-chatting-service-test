import { TFriendStatus } from "src/constants";

export interface FriendListResponse {
  friendList: FriendListItem[];
}

export interface FriendListItem {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
}

export interface AddFriendResponse {
  requestId: number;
  userId: number;
  status: TFriendStatus;
}

export interface AddRequestListResponse {
  addRequestList: AddRequestListItem[];
}

export interface AddRequestListItem {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
}

export interface AcceptFriendRequest {
  status: TFriendStatus;
}

export interface AcceptFriendResponse {
  requestId: number;
  userId: number;
  status: TFriendStatus;
}
