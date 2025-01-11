import React from "react";
import styles from "../styles/FlowChart.module.css";

interface SidebarProps {
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.description}>Drag Nodes to the canvas:</div>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "Cold Email")}
        draggable
      >
        Cold Email
      </div>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "Wait/Delay")}
        draggable
      >
        Wait/Delay
      </div>
      <div
        className={styles.node}
        onDragStart={(event) => onDragStart(event, "Lead Source")}
        draggable
      >
        Lead Source
      </div>
    </aside>
  );
};

export default Sidebar;
