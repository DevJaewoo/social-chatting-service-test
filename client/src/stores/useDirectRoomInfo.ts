import { create } from "zustand";

interface DirectRoomInfo {
  directId: number;
  friendId: number;
}

interface DirectRoomInfoStore {
  directRoomInfo: DirectRoomInfo | undefined;
  updateDirectRoomInfo: (state: DirectRoomInfo) => void;
  clearDirectRoomInfo: () => void;
}

const directRoomInfoStore = create<DirectRoomInfoStore>((set) => ({
  directRoomInfo: undefined,
  updateDirectRoomInfo: (state: DirectRoomInfo) =>
    set(() => ({
      directRoomInfo: state,
    })),
  clearDirectRoomInfo: () => set({ directRoomInfo: undefined }),
}));

export { directRoomInfoStore };
