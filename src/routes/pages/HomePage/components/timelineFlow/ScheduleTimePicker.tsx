import React from "react";
import { TextField } from "@mui/material";

interface ScheduleTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ScheduleTimePicker: React.FC<ScheduleTimePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      type="datetime-local"
      label="Schedule Time"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      margin="normal"
    />
  );
};

export default ScheduleTimePicker;
