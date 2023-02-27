import { TFriendStatus } from "src/constants";

export interface FriendListItemResponseDto {
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
