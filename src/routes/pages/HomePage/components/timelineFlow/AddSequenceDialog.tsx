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

// Define types for email templates and sequences
interface EmailTemplate {
  label: string;
  body: string;
}

interface Node {
  id: string;
  data: string;
  position: { x: number; y: number };
}

interface NewSequence {
  email: string;
  scheduleTime: string;
  emailTemplate: string;
  nodes: Node[]; // Ensure nodes property is included
}

// Email templates array
const emailTemplates: EmailTemplate[] = [
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

// Define props for AddSequenceDialog
interface AddSequenceDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  saveSequence: () => void;
  newSequence: NewSequence;
  setNewSequence: React.Dispatch<React.SetStateAction<NewSequence>>;
}

// Functional component
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
        {/* Email Field */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={newSequence.email}
          onChange={(e) =>
            setNewSequence((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        {/* Schedule Time Field */}
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
        {/* Email Template Selector */}
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
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        >
          {emailTemplates.map((template) => (
            <MenuItem key={template.label} value={template.label}>
              {template.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      {/* Action Buttons */}
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
