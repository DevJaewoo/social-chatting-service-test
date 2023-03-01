import { create } from "zustand";

interface DirectRoomInfoStore {
  directRoomInfo: number | undefined;
  updateDirectRoomInfo: (state: number) => void;
  clearDirectRoomInfo: () => void;
}

const directRoomInfoStore = create<DirectRoomInfoStore>((set) => ({
  directRoomInfo: undefined,
  updateDirectRoomInfo: (state: number) =>
    set(() => ({
      directRoomInfo: state,
    })),
  clearDirectRoomInfo: () => set({ directRoomInfo: undefined }),
}));

export { directRoomInfoStore };
