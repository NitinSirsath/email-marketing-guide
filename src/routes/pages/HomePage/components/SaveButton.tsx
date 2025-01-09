import React from "react";
import { Button } from "@mui/material";
import useCustomAxios from "../../../../services/api/customAxios";

interface SaveButtonProps {
  nodes: any;
  edges: any;
}

const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges }) => {
  const axiosInstance = useCustomAxios();

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/api/emails/save", { nodes });
      console.log("Flowchart saved:", response.data);
    } catch (error) {
      console.error("Error saving flowchart:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSave}>
      Save Flowchart
    </Button>
  );
};

export default SaveButton;
