import { create } from "zustand";
import Stack from "./dataStructures/stack";

const useStore = create((set) => ({
  // Initialize the dataStack with a new Stack instance
  dataStack: new Stack(),

  // Method to set (update) the entire stack
  setStack: (newStack) => set({ dataStack: newStack }),

  // If you need to access the current data or size, you can still include these as getters
  currentData: () => get().dataStack.peek(),
  size: () => get().dataStack.size(),
}));

export default useStore;
