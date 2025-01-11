import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import useCustomAxios from "../../../../../services/api/customAxios";
import ScheduleTimePicker from "./ScheduleTimePicker";

const TimelineFlow = () => {
  const axiosInstance = useCustomAxios();
  const [sequences, setSequences] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSequence, setNewSequence] = useState({
    email: "",
    scheduleTime: "",
    nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
  });

  useEffect(() => {
    // Fetch sequences data
    const fetchSequences = async () => {
      try {
        const response = await axiosInstance.get("/emails/all");
        setSequences(response.data.sequences);
        console.log("Fetched sequences:", response.data.sequences);
      } catch (error) {
        console.error("Error fetching sequences:", error);
      }
    };

    fetchSequences();
  }, [axiosInstance]);

  // Save sequence
  const saveSequence = async () => {
    const { email, scheduleTime, nodes } = newSequence;

    if (!scheduleTime) {
      alert("Please provide a schedule time");
      return;
    }

    try {
      const response = await axiosInstance.post("/emails/save", {
        email,
        scheduleTime,
        nodes,
      });
      console.log("Saved sequence:", response.data);
      setSequences((prev) => [...prev, response.data.sequence]); // Update state with new sequence
      setDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Error saving sequence:", error);
    }
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* Add Lead Sources */}
      <Box
        width={300}
        padding={2}
        textAlign="center"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        borderRadius={2}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          +
        </Typography>
        <Typography variant="body1" gutterBottom>
          Add Lead Sources
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Click to add leads from list or CRM
        </Typography>
      </Box>

      {/* Start Sequence Button */}
      <Button variant="outlined" onClick={handleDialogOpen}>
        Sequence Start Point
      </Button>

      {/* Timeline */}
      <Box width="80%">
        <Typography variant="h6" gutterBottom>
          Timeline of Sequences
        </Typography>
        <Timeline position="alternate">
          {sequences.map((sequence) => (
            <TimelineItem key={sequence._id}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6">
                  Sequence ID: {sequence._id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Nodes Count: {sequence.nodes.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created At: {new Date(sequence.createdAt).toLocaleString()}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      {/* Add Sequence Dialog */}
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
          <ScheduleTimePicker
            value={newSequence.scheduleTime}
            onChange={(value) =>
              setNewSequence((prev) => ({ ...prev, scheduleTime: value }))
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
    </div>
  );
};

export default TimelineFlow;
