// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  dataStack: [],
  pushData: (newData) =>
    set((state) => ({ dataStack: [...state.dataStack, newData] })),
  popData: () => set((state) => ({ dataStack: state.dataStack.slice(0, -1) })),
}));

export default useStore;
