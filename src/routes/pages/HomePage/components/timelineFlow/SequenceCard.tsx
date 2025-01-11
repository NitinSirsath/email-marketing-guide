import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Button, Typography, Box } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

interface SequenceCardProps {
  sequence: {
    _id: string;
    nodes: any[];
    createdAt: string;
    email: string;
    scheduleTime: string;
  };
  onEdit: (sequence: any) => void;
  onDelete: (sequence: any) => void; // Pass the full sequence object for deletion
}

const SequenceCard: React.FC<SequenceCardProps> = ({
  sequence,
  onEdit,
  onDelete,
}) => {
  return (
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

        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(sequence)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(sequence)}
          >
            Delete
          </Button>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default SequenceCard;
