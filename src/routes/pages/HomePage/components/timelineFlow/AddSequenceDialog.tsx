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

interface AddSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  newSequence: any;
  setNewSequence: React.Dispatch<React.SetStateAction<any>>;
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
        <TextField
          select
          label="Select Email Template"
          fullWidth
          margin="normal"
          value={newSequence.emailTemplate}
          onChange={(e) =>
            setNewSequence((prev) => ({
              ...prev,
              emailTemplate: e.target.value,
            }))
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

export default AddSequenceDialog;
