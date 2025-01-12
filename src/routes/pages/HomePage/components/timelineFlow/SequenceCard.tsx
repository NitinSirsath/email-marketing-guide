import React, { useState } from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { useToastStore } from "../../../../../services/store/snackbar/toastStore";
import { SequenceCardProps } from "../../types/FlowTypes";

const SequenceCard: React.FC<SequenceCardProps> = ({
  sequence,
  onEdit,
  onDelete,
}) => {
  const { showToast } = useToastStore();
  const isPastSchedule = new Date(sequence.scheduleTime) < new Date();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false); // Explicit type

  const handleDeleteClick = () => {
    if (isPastSchedule) {
      setConfirmDialogOpen(true);
    } else {
      onDelete(sequence);
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDialogOpen(false);
    onDelete(sequence);
  };

  const handleDisabledButtons = () => {
    showToast("Past entries cannot be edited", "warning");
  };

  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box mb={1}>
            <Typography variant="h6" gutterBottom>
              Sequence ID: {sequence._id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Nodes Count: {sequence.nodes.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Created At: {new Date(sequence.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Email:</strong> {sequence.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Schedule Time:</strong>{" "}
              {new Date(sequence.scheduleTime).toLocaleString()}
            </Typography>
          </Box>

          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={
                isPastSchedule ? handleDisabledButtons : () => onEdit(sequence)
              }
            >
              Edit
            </Button>
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </TimelineContent>
      </TimelineItem>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>
            This entry belongs to a past schedule, and the operation is
            completed. Do you want to delete it anyway?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SequenceCard;
