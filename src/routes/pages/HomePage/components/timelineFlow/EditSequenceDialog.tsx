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
import { Sequence } from "../../types/FlowTypes";

interface EditSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  currentSequence: Sequence | null; // Allow `null` for currentSequence
  setCurrentSequence: React.Dispatch<React.SetStateAction<Sequence | null>>;
}

const EditSequenceDialog: React.FC<EditSequenceDialogProps> = ({
  dialogOpen,
  handleDialogClose,
  saveSequence,
  currentSequence,
  setCurrentSequence,
}) => {
  if (!currentSequence) return null; // Prevent rendering when currentSequence is null

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
            setCurrentSequence((prev) =>
              prev
                ? {
                    ...prev,
                    email: e.target.value,
                  }
                : null
            )
          }
        />
        <TextField
          label="Schedule Time"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={currentSequence.scheduleTime}
          onChange={(e) =>
            setCurrentSequence((prev) =>
              prev
                ? {
                    ...prev,
                    scheduleTime: e.target.value,
                  }
                : null
            )
          }
        />
        <TextField
          select
          label="Select Email Template"
          fullWidth
          margin="normal"
          value={currentSequence.emailTemplate}
          onChange={(e) =>
            setCurrentSequence((prev) =>
              prev
                ? {
                    ...prev,
                    emailTemplate: e.target.value,
                  }
                : null
            )
          }
        >
          {emailTemplates.map((template) => (
            <MenuItem key={template.label} value={template.label}>
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
