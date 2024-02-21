// store.js
import { create } from "zustand";
const useStore = create((set) => ({
  dataStack: [],
  pushData: (newData) =>
    set((state) => ({ dataStack: [...state.dataStack, newData] })),
  popData: () => set((state) => ({ dataStack: state.dataStack.slice(0, -1) })),
  // Modify currentData to directly return the current data, not use set
  currentData: () => {
    return (get) => {
      const state = get(); // Use get to access the current state
      return state.dataStack[state.dataStack.length - 1] || null;
    };
  },
}));

export default useStore;
