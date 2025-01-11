import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface EditSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  sequence: any;
  setSequence: React.Dispatch<React.SetStateAction<any>>;
  saveSequence: () => void;
}

const EditSequenceDialog: React.FC<EditSequenceDialogProps> = ({
  dialogOpen,
  handleDialogClose,
  sequence,
  setSequence,
  saveSequence,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
      <DialogTitle>Edit Sequence</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={sequence.email}
          onChange={(e) =>
            setSequence((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          label="Schedule Time"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={sequence.scheduleTime}
          onChange={(e) =>
            setSequence((prev) => ({
              ...prev,
              scheduleTime: e.target.value,
            }))
          }
        />
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

export default EditSequenceDialog;
