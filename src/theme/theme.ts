import { createTheme } from '@mui/material/styles';

// Light mode color conventions
const lightColors = {
  primary: '#3365D3', // Blue
  secondary: '#34495E', // Purple
  text: '#333333', // Dark gray
  background: '#ffffff', // White
  surface: '#f5f5f5', // Light gray
  error: '#f44336', // Red
  success: '#4caf50', // Green
  neutral: '#757575', // Medium gray
};

// Dark mode color conventions
const darkColors = {
  primary: '#6699CC', // Light blue
  secondary: '#95A5A6', // Pink
  text: '#ffffff', // White
  background: '#121212', // Dark gray
  surface: '#333333', // Darker gray
  error: '#d32f2f', // Dark red
  success: '#00e676', // Dark green
  neutral: '#bdbdbd', // Light gray
};

// Light mode theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightColors.primary,
    },
    secondary: {
      main: lightColors.secondary,
    },
    text: {
      primary: lightColors.text,
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Set to "none" to prevent all caps
          borderRadius: 7,
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0px',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          margin: '28px 0px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '8px 0px',
        },
      },
    },
  },
});

// Dark mode theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkColors.primary,
    },
    secondary: {
      main: darkColors.secondary,
    },
    text: {
      primary: darkColors.text,
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Set to "none" to prevent all caps
          borderRadius: 7,
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0px',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          margin: '28px 0px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '8px 0px',
        },
      },
    },
  },
});
