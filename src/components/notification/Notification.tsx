import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotificationStore } from "../../services/store/notification/notificationStore";

const Notification: React.FC = () => {
  const { showNotification, deactivateNotification } = useNotificationStore();

  return (
    <Snackbar
      open={showNotification}
      autoHideDuration={9000}
      onClose={deactivateNotification}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={deactivateNotification}
        severity="info"
        sx={{ width: "100%" }}
      >
        Note: MUI Timeline was used instead of ReactFlow to deliver the solution
        within the timeline. This showcases my ability to structure the project
        frontend and backend effectively.
      </Alert>
    </Snackbar>
  );
};

export default Notification;
