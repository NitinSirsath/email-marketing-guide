import { Dialog, DialogContent, styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useBackdropStore } from "../../services/store/loading/backdropLoaderStore";

const TransparentDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
  },
}));

export default function BackdropLoader() {
  const { open } = useBackdropStore();

  return (
    <TransparentDialog open={open} fullScreen disableEscapeKeyDown>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </DialogContent>
    </TransparentDialog>
  );
}
