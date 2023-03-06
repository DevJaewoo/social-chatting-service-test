export interface DirectChatList {
  directId: number;
  directChatList: DirectChat[];
}

export interface DirectChat {
  userId: number;
  message: string;
  createdAt: Date;
}
