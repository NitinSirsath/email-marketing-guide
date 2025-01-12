import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { emailTemplates } from "../mailTemplates/emailTemplates";

interface EditSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  currentSequence: {
    id: string;
    email: string;
    scheduleTime: string;
    nodes: Array<any>;
    emailTemplate: string;
  };
  setCurrentSequence: React.Dispatch<React.SetStateAction<any>>;
}

const EditSequenceDialog: React.FC<EditSequenceDialogProps> = ({
  dialogOpen,
  handleDialogClose,
  saveSequence,
  currentSequence,
  setCurrentSequence,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
      <DialogTitle>Edit Sequence</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={currentSequence.email}
          onChange={(e) =>
            setCurrentSequence((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <TextField
          label="Schedule Time"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={currentSequence.scheduleTime}
          onChange={(e) =>
            setCurrentSequence((prev) => ({
              ...prev,
              scheduleTime: e.target.value,
            }))
          }
        />
        <TextField
          select
          label="Select Email Template"
          fullWidth
          margin="normal"
          value={currentSequence.emailTemplate}
          onChange={(e) =>
            setCurrentSequence((prev) => ({
              ...prev,
              emailTemplate: e.target.value,
            }))
          }
        >
          {emailTemplates.map((template) => (
            <MenuItem key={template.label} value={template.value}>
              {template.label}
            </MenuItem>
          ))}
        </TextField>
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
