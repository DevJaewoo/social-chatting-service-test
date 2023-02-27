import { TFollowStatus, TFriendStatus } from "src/constants";

export interface UserListResponse {
  userList: UserListItem[];
}

export interface UserListItem {
  id: number;
  name: string;
  nickname: string;
  friendStatus: TFriendStatus;
  followStatus: TFollowStatus;
  createdAt: Date;
}
