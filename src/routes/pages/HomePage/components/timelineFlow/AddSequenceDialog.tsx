import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

interface AddSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  newSequence: {
    email: string;
    scheduleTime: string;
    nodes: Array<any>;
  };
  setNewSequence: React.Dispatch<
    React.SetStateAction<{
      email: string;
      scheduleTime: string;
      nodes: Array<any>;
    }>
  >;
}

const AddSequenceDialog: React.FC<AddSequenceDialogProps> = ({
  dialogOpen,
  handleDialogClose,
  saveSequence,
  newSequence,
  setNewSequence,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
      <DialogTitle>Add New Sequence</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={newSequence.email}
          onChange={(e) =>
            setNewSequence((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          label="Schedule Time"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={newSequence.scheduleTime}
          onChange={(e) =>
            setNewSequence((prev) => ({
              ...prev,
              scheduleTime: e.target.value,
            }))
          }
        />
        <Typography variant="body2" color="textSecondary" margin="normal">
          Nodes are pre-filled with the default "Start" node.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveSequence} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSequenceDialog;
