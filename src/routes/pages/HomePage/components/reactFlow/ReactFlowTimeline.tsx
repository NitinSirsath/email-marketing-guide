// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   List,
//   ListItem,
//   ListItemButton,
//   TextField,
// } from "@mui/material";
// import useCustomAxios from "../../../../../services/api/customAxios";

// const initialNodes = [
//   {
//     id: "start",
//     position: { x: 250, y: 50 },
//     data: { label: "Sequence Start" },
//   },
// ];
// const initialEdges = [];

// const ReactFlowTimeline: React.FC = () => {
//   const axiosInstance = useCustomAxios();
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogType, setDialogType] = useState("");
//   const [newNodeData, setNewNodeData] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("");

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const openDialog = (type: string) => {
//     setDialogType(type);
//     setIsDialogOpen(true);
//   };

//   const addNode = () => {
//     const id = `${Date.now()}`;
//     let label = "";

//     if (dialogType === "leadSource") {
//       label = `Lead Source: ${newNodeData}`;
//     } else if (dialogType === "coldEmail") {
//       label = `Email (template: ${selectedTemplate})`;
//     } else if (dialogType === "waitDelay") {
//       label = `Wait/Delay: ${newNodeData}`;
//     }

//     setNodes((nds) =>
//       nds.concat({
//         id,
//         type: "default",
//         position: { x: 250, y: nds.length * 100 + 50 },
//         data: { label },
//       })
//     );

//     setIsDialogOpen(false);
//     setNewNodeData("");
//     setSelectedTemplate("");
//   };

//   const saveFlowchart = async () => {
//     const payload = { nodes, edges, email: "example@gmail.com" };
//     try {
//       const response = await axiosInstance.post("/emails/save", payload);
//       console.log("Flowchart saved successfully:", response.data);
//     } catch (error) {
//       console.error("Error saving flowchart:", error);
//     }
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%", position: "relative" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//       <Button
//         variant="contained"
//         style={{ position: "absolute", bottom: 20, left: 20 }}
//         onClick={() => openDialog("leadSource")}
//       >
//         Add Lead Source
//       </Button>
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>
//           {dialogType === "leadSource" && "Select Lead Source"}
//           {dialogType === "coldEmail" && "Select Email Template"}
//           {dialogType === "waitDelay" && "Set Wait/Delay"}
//         </DialogTitle>
//         <DialogContent>
//           {dialogType === "leadSource" && (
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton onClick={() => setNewNodeData("Test List")}>
//                   Test List
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           )}
//           {dialogType === "coldEmail" && (
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   onClick={() =>
//                     setSelectedTemplate("AI Assisted - Follow Up 1")
//                   }
//                 >
//                   AI Assisted - Follow Up 1
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           )}
//           {dialogType === "waitDelay" && (
//             <TextField
//               label="Enter delay time (e.g., 10 minutes)"
//               fullWidth
//               value={newNodeData}
//               onChange={(e) => setNewNodeData(e.target.value)}
//             />
//           )}
//         </DialogContent>
//         <Button
//           variant="contained"
//           onClick={addNode}
//           style={{ margin: "10px" }}
//         >
//           Add
//         </Button>
//       </Dialog>
//     </div>
//   );
// };

// export default ReactFlowTimeline;
