import { Box, Button, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import AddSequenceDialog from "./AddSequenceDialog";
import SequenceCard from "./SequenceCard";
import EditSequenceDialog from "./EditSequenceDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import useTimelineFlow from "../../hooks/useTimelineFlow";

const TimelineFlow = () => {
  const {
    setDialogOpen,
    sequences,
    handleEdit,
    handleDelete,
    dialogOpen,
    saveSequence,
    newSequence,
    setNewSequence,
    sequenceToDelete,
    confirmationOpen,
    setConfirmationOpen,
    deleteSequence,
    currentSequence,
    editDialogOpen,
    updateSequence,
    setCurrentSequence,
    setEditDialogOpen,
  } = useTimelineFlow();
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
