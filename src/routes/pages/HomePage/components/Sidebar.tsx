import React from "react";
import styles from "../styles/FlowChart.module.css";

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.sidebar}>
      <h4>Drag Nodes:</h4>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "coldEmail")}
        draggable
      >
        Cold Email
      </div>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "waitDelay")}
        draggable
      >
        Wait/Delay
      </div>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "leadSource")}
        draggable
      >
        Lead Source
      </div>
    </div>
  );
};

export default Sidebar;
