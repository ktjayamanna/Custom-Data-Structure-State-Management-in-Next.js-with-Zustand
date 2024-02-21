import React, { useState, useEffect } from "react";
import useStore from "../store"; // Adjust the path as necessary
import Stack from "../dataStructures/stack";

const DataViewComponent = () => {
  const [localStack, setLocalStack] = useState(() => new Stack());

  // Access the setter from the Zustand store to update the global stack
  const syncStackWithGlobal = useStore((state) => state.setStack);

  // On component mount, initialize the local stack with the global stack's items
  useEffect(() => {
    const globalStack = useStore.getState().dataStack;
    const newStack = new Stack();
    newStack.items = [...globalStack.items];
    setLocalStack(newStack);
  }, []);

  const localPushData = (newData) => {
    localStack.push(newData);
    // Trigger state update with a new reference to ensure re-render
    setLocalStack(localStack.clone());
  };

  const localPopData = () => {
    localStack.pop();
    // Trigger state update with a new reference to ensure re-render
    setLocalStack(localStack.clone());
  };

  // Sync the local stack back to the global state on demand
  const handleSync = () => {
    console.log("before", useStore.getState().dataStack);
    syncStackWithGlobal(localStack);
    console.log("after", useStore.getState().dataStack);
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
      {/* Optional: Button to sync the local stack back to the global state */}
      <button
        onClick={handleSync}
        style={{
          fontSize: "20px",
          padding: "15px 30px",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ddd",
          margin: "20px",
          color: "#333",
        }}
      >
        Sync with Global
      </button>
    </div>
  );
};

export default DataViewComponent;
