import { create } from "zustand";

export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  createdAt: Date;
}

interface UserInfoStore {
  userInfo: UserInfo | undefined;
  updateUserInfo: (state: UserInfo) => void;
  clearUserInfo: () => void;
}

const currentUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: undefined,
  updateUserInfo: (state: UserInfo) => set(() => ({ userInfo: { ...state } })),
  clearUserInfo: () => set({ userInfo: undefined }),
}));

export { currentUserInfoStore };
