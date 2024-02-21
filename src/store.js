import { create } from "zustand";
// import Stack from "./stack"; // Adjust the path as necessary
import Stack from "./dataStructures/stack";

const useStore = create((set) => {
  const dataStack = new Stack();

  return {
    dataStack,
    pushData: (newData) => {
      dataStack.push(newData);
      // Trigger Zustand state update to rerender components
      set({ dataStack: dataStack });
    },
    popData: () => {
      dataStack.pop();
      // Trigger Zustand state update to rerender components
      set({ dataStack: dataStack });
    },
    // This method directly accesses the Stack instance without Zustand's set
    currentData: () => {
      return dataStack.peek();
    },
    // Optional: Method to get the current size of the stack
    size: () => {
      return dataStack.size();
    },
  };
});

export default useStore;
