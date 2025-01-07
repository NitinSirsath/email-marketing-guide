import { ThemeProvider } from "@emotion/react";
// import './App.css';
import useThemeStore from "./services/store/theme/themeStore";
import { darkTheme, lightTheme } from "./theme/theme";
import { Paper, createTheme } from "@mui/material";
import AppRouter from "./routes/AppRouter";
// import useLastUpdateHistory from './components/hooks/apiHistory/useLastUpdateHistory';

function App() {
  const { darkMode } = useThemeStore();
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
          transition: "background-color 0.5s ease",
        }}
      >
        <AppRouter />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
