import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import useCustomAxios from "../../../../../services/api/customAxios";
import AddSequenceDialog from "./AddSequenceDialog";
import SequenceCard from "./SequenceCard";
import EditSequenceDialog from "./EditSequenceDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import { emailTemplates } from "../mailTemplates/emailTemplates";

const TimelineFlow = () => {
  const axiosInstance = useCustomAxios();
  const [sequences, setSequences] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newSequence, setNewSequence] = useState({
    email: "",
    scheduleTime: "",
    nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
    emailTemplate: "",
  });
  const [currentSequence, setCurrentSequence] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<any>(null);

  // Fetch sequences
  const fetchSequences = async () => {
    try {
      const response = await axiosInstance.get("/emails/all");
      setSequences(response.data.sequences);
    } catch (error) {
      console.error("Error fetching sequences:", error);
    }
  };
  useEffect(() => {
    fetchSequences();
  }, [axiosInstance]);

  // Save new sequence
  const saveSequence = async () => {
    console.log(newSequence, "newSequence");

    // Find the selected template based on the user's choice
    const selectedTemplate = emailTemplates.find(
      (template) => template.value === newSequence.emailTemplate
    );
    console.log(selectedTemplate, newSequence, "newSequence");
    if (!selectedTemplate) {
      console.error("Selected email template not found");
      return;
    }

    const body = {
      email: newSequence.email,
      scheduleTime: newSequence.scheduleTime,
      nodes: newSequence.nodes,
      emailBody: selectedTemplate.body(newSequence.emailTemplate), // Dynamically render the body
    };

    try {
      const response = await axiosInstance.post("/emails/save", body);
      if (response.status === 201 || response.status === 200) {
        fetchSequences();
        setDialogOpen(false);

        setNewSequence({
          email: "",
          scheduleTime: "",
          nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
          emailTemplate: "",
        });
      }
    } catch (error) {
      console.error("Error saving sequence:", error);
    }
  };

  // Update existing sequence
  const updateSequence = async () => {
    try {
      const response = await axiosInstance.post(
        `/emails/save`,
        currentSequence
      );
      if (response.status === 200) {
        fetchSequences();
        setCurrentSequence(null);
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating sequence:", error);
    }
  };

  // Delete sequence
  const deleteSequence = async (sequenceId: string) => {
    try {
      const response = await axiosInstance.post("/emails/delete", {
        sequenceId,
      });
      if (response.status === 200) {
        fetchSequences();
        setConfirmationOpen(false);
      }
      console.log("Sequence deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting sequence:", error);
    }
  };

  const handleEdit = (sequence: any) => {
    setCurrentSequence(sequence);
    setEditDialogOpen(true);
  };

  const handleDelete = (sequence: any) => {
    setSequenceToDelete(sequence);
    setConfirmationOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
      }}
    >
      <Box
        width={300}
        padding={2}
        textAlign="center"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        borderRadius={2}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          +
        </Typography>
        <Typography variant="body1" gutterBottom>
          Add Lead Sources
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Click to add leads from list or CRM
        </Typography>
      </Box>

      <Button variant="outlined" onClick={() => setDialogOpen(true)}>
        Sequence Start Point
      </Button>

      <Box width="80%">
        <Typography variant="h6" gutterBottom>
          Timeline of Sequences
        </Typography>
        <Timeline position="alternate">
          {sequences.map((sequence) => (
            <SequenceCard
              key={sequence._id}
              sequence={sequence}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Timeline>
      </Box>

      <AddSequenceDialog
        dialogOpen={dialogOpen}
        handleDialogClose={() => setDialogOpen(false)}
        saveSequence={saveSequence}
        newSequence={newSequence}
        setNewSequence={setNewSequence}
      />

      {sequenceToDelete && (
        <ConfirmationDialog
          open={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={() => deleteSequence(sequenceToDelete._id)}
          sequenceDetails={{
            email: sequenceToDelete.email,
            scheduleTime: sequenceToDelete.scheduleTime,
          }}
        />
      )}

      {currentSequence && (
        <EditSequenceDialog
          dialogOpen={editDialogOpen}
          handleDialogClose={() => setEditDialogOpen(false)}
          saveSequence={updateSequence}
          currentSequence={currentSequence}
          setCurrentSequence={setCurrentSequence}
        />
      )}
    </div>
  );
};

export default TimelineFlow;
