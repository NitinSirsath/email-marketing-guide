import React, { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";

interface EmailNodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { email: string; subject: string; body: string }) => void;
}

const EmailNodeDialog: React.FC<EmailNodeDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSave = () => {
    onSave({ email, subject, body });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: 20 }}>
        <h4>Configure Email</h4>
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Subject"
          fullWidth
          margin="dense"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Body"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default EmailNodeDialog;
