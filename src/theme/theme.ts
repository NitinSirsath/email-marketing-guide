import { createTheme } from "@mui/material/styles";

// Light mode color conventions
const lightColors = {
  primary: "#0065FF", // Vibrant blue
  secondary: "#6b7280", // Neutral gray
  text: "#1f2937", // Dark gray
  background: "#f9fafb", // Very light gray
  surface: "#ffffff", // Pure white for contrast
  error: "#ef4444", // Red
  success: "#10b981", // Green
  neutral: "#d1d5db", // Light gray
};

// Dark mode color conventions
const darkColors = {
  primary: "#60a5fa", // Soft blue
  secondary: "#9ca3af", // Neutral gray
  text: "#e5e7eb", // Light gray
  background: "#1e293b", // Deep navy-gray
  surface: "#2d3748", // Dark gray
  error: "#f87171", // Soft red
  success: "#34d399", // Soft green
  neutral: "#6b7280", // Medium gray
};

// Shared typography settings
const typography = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  body1: { fontSize: "1rem", fontWeight: 400 },
  body2: { fontSize: "0.875rem", fontWeight: 400 },
  h1: { fontSize: "2.25rem", fontWeight: 600 },
  h2: { fontSize: "2rem", fontWeight: 500 },
  h3: { fontSize: "1.75rem", fontWeight: 500 },
};

// Light mode theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primary,
    },
    secondary: {
      main: lightColors.secondary,
    },
    text: {
      primary: lightColors.text,
      secondary: lightColors.neutral,
    },
    background: {
      default: lightColors.background,
      paper: lightColors.surface,
    },
    error: {
      main: lightColors.error,
    },
    success: {
      main: lightColors.success,
    },
  },
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent all caps
          borderRadius: 8, // Softer edges
          fontWeight: 500,
          fontSize: "0.875rem", // Smaller size for minimal look
          boxShadow: "none", // Minimal shadow
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12, // Rounded edges for a modern look
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "8px 0px", // Consistent spacing
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.surface,
          color: lightColors.text,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle elevation
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          margin: "20px 0px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: "12px 0px",
        },
      },
    },
  },
});

// Dark mode theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.primary,
    },
    secondary: {
      main: darkColors.secondary,
    },
    text: {
      primary: darkColors.text,
      secondary: darkColors.neutral,
    },
    background: {
      default: darkColors.background,
      paper: darkColors.surface,
    },
    error: {
      main: darkColors.error,
    },
    success: {
      main: darkColors.success,
    },
  },
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.875rem",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.1)", // Subtle hover shadow for dark mode
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12,
          backgroundColor: darkColors.surface,
          boxShadow: "0px 1px 3px rgba(255, 255, 255, 0.1)", // Subtle dark mode shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "12px 0px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.surface,
          color: darkColors.text,
          boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.1)", // Minimal shadow
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          margin: "20px 0px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: "12px 0px",
        },
      },
    },
  },
});
