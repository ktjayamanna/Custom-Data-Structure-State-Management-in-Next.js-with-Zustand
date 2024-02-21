import React from "react";
import useStore from "../store";

const DataViewComponent = () => {
  // Directly access the state using the useStore hook
  const currentData = useStore((state) =>
    state.dataStack.length > 0
      ? state.dataStack[state.dataStack.length - 1]
      : null
  );
  const pushData = useStore((state) => state.pushData);
  const popData = useStore((state) => state.popData);
  const dataStack = useStore((state) => state.dataStack);

  // Dummy function to simulate data changes
  const changeData = () => {
    const newData = `Data ${Math.random()}`;
    pushData(newData);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "36px", color: "lightblue", fontWeight: "bold" }}>
        Current Data: {currentData}
      </h1>
      <button
        style={{
          fontSize: "20px",
          padding: "15px 30px",
          borderRadius: "8px",
          backgroundColor: "lightblue",
          border: "none",
          margin: "20px",
          color: "green",
        }}
        onClick={changeData}
      >
        Change Data
      </button>
      <button
        style={{
          fontSize: "20px",
          padding: "15px 30px",
          borderRadius: "8px",
          backgroundColor: "lightblue",
          border: "none",
          margin: "20px",
          color: "red",
        }}
        onClick={popData}
        disabled={dataStack.length <= 1}
      >
        Back
      </button>
    </div>
  );
};

export default DataViewComponent;
