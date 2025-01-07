import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Typography } from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import MessageIcon from "@mui/icons-material/Message";
import { useToastStore } from "../../services/store/snackbar/toastStore";

const icons = {
  success: <PlaylistAddCheckCircleRoundedIcon />,
  danger: <ErrorIcon />,
  warning: <WarningIcon />,
  primary: <MessageIcon />,
  neutral: <MessageIcon />, // Use an empty fragment as a placeholder
};

export default function SnackbarActions() {
  const { message, severity, hideToast } = useToastStore();
  const autoHideDuration = 5000; // Set autoHideDuration to 5 seconds (5000 milliseconds)

  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (message) {
      timerRef.current = window.setTimeout(() => {
        hideToast();
      }, autoHideDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [message, autoHideDuration, hideToast]);

  const snackbarColor = {
    success: "#207A1F", // Green
    danger: "#d32f2f", // Red
    warning: "#ffa000", // Orange
    primary: "#1976d2", // Blue
    neutral: "#323232", // Gray
  };

  return (
    <React.Fragment>
      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={autoHideDuration}
          // onClose={hideToast}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <SnackbarContent
            style={{ backgroundColor: snackbarColor[severity || "neutral"] }}
            sx={{ borderRadius: "10px" }}
            message={
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">{message}</Typography>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {severity && icons[severity]}
                  <Button
                    size="small"
                    variant="contained"
                    onClick={hideToast}
                    style={{
                      backgroundColor: "#ffffff",
                      color: snackbarColor[severity || "neutral"],
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            }
          />
        </Snackbar>
      )}
    </React.Fragment>
  );
}
