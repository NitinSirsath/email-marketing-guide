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

const emailTemplates = [
  {
    label: "AI Assisted",
    body: "<h1>AI Assisted</h1><p>Your sequence is AI-assisted and personalized.</p>",
  },
  {
    label: "AI Assisted: Follow up",
    body: "<h1>Follow-Up</h1><p>This is an AI-assisted follow-up email.</p>",
  },
  {
    label: "Simple Reminder",
    body: "<h1>Reminder</h1><p>This is a simple reminder email for your sequence.</p>",
  },
];

interface EditSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  sequence: any;
  setSequence: React.Dispatch<React.SetStateAction<any>>;
}

const EditSequenceDialog: React.FC<EditSequenceDialogProps> = ({
  dialogOpen,
  handleDialogClose,
  saveSequence,
  sequence,
  setSequence,
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
            setSequence((prev: any) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          label="Schedule Time"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={sequence.scheduleTime}
          onChange={(e) =>
            setSequence((prev: any) => ({
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
          value={sequence.emailBody}
          onChange={(e) =>
            setSequence((prev: any) => ({
              ...prev,
              emailBody: e.target.value,
            }))
          }
        >
          {emailTemplates.map((template) => (
            <MenuItem key={template.label} value={template.body}>
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
