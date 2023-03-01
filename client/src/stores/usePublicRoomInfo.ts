import { create } from "zustand";
import { PublicRoomInfo } from "src/socketConstants";

interface PublicRoomInfoStore {
  publicRoomInfo: PublicRoomInfo | undefined;
  updatePublicRoomInfo: (state: PublicRoomInfo) => void;
  clearPublicRoomInfo: () => void;
}

const publicRoomInfoStore = create<PublicRoomInfoStore>((set) => ({
  publicRoomInfo: undefined,
  updatePublicRoomInfo: (state: PublicRoomInfo) =>
    set(() => ({ publicRoomInfo: { ...state } })),
  clearPublicRoomInfo: () => set({ publicRoomInfo: undefined }),
}));

export { publicRoomInfoStore };
