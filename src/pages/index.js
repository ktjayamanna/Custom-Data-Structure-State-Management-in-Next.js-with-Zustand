import React, { useState, useEffect } from "react";
import useStore from "../store"; // Adjust the path as necessary
import Stack from "../dataStructures/stack";

const DataViewComponent = () => {
  // Local state for the stack
  const [localStack, setLocalStack] = useState(new Stack());

  // Access the global stack and actions from Zustand store
  const {
    dataStack: globalStack,
    pushData,
    popData,
  } = useStore((state) => ({
    dataStack: state.dataStack,
    pushData: state.pushData,
    popData: state.popData,
  }));

  // On component mount, copy the global stack to the local stack
  useEffect(() => {
    setLocalStack(globalStack);
  }, [globalStack]);

  // Define local methods to modify the local stack
  const localPushData = (newData) => {
    const newStack = new Stack();
    newStack.items = [...localStack.items, newData]; // Copy and push new data
    setLocalStack(newStack);
  };

  const localPopData = () => {
    const newStack = new Stack();
    newStack.items = localStack.items.slice(0, -1); // Copy and pop data
    setLocalStack(newStack);
  };

  // Accessing current data and size from the local stack
  const currentData = localStack.peek();
  const size = localStack.size();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "36px", color: "lightblue", fontWeight: "bold" }}>
        Current Data: {currentData || "Empty"}
      </h1>
      <button
        onClick={() => localPushData(`Data ${Math.random()}`)}
        style={{
          fontSize: "20px",
          padding: "15px 30px",
          borderRadius: "8px",
          backgroundColor: "lightblue",
          border: "none",
          margin: "20px",
          color: "green",
        }}
      >
        Change Data
      </button>
      <button
        onClick={localPopData}
        disabled={size <= 1}
        style={{
          fontSize: "20px",
          padding: "15px 30px",
          borderRadius: "8px",
          backgroundColor: "lightblue",
          border: "none",
          margin: "20px",
          color: "red",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default DataViewComponent;
