import React, { useState } from "react";
import {
  TextField,
  Container,
  FormControlLabel,
  Checkbox,
  IconButton,
  CircularProgress,
  Link,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  ArrowForwardIos,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "../loginPage.module.css";
import { useAuthStore } from "../../../../services/store/auth/authStore";
import { urls } from "../../../../services/api/urls";
import { setUserData } from "../../../../services/localStorage/authUtils";
import companyLogo from "../../../../assets/FutureBlink.webp";
import loginBG from "../../../../assets/loginbg.svg";

interface FormData {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
  rememberMe: boolean;
}

interface LoginResponse {
  token?: string;
  error?: string;
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
});

const LoginPage: React.FC = () => {
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameError = formData.username ? "" : "Username is required";
    const passwordError = formData.password ? "" : "Password is required";

    setFormData((prev) => ({
      ...prev,
      usernameError,
      passwordError,
    }));

    if (!usernameError && !passwordError) {
      handleLogin(formData);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: "",
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: event.target.checked,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (formData: FormData): Promise<void> => {
    setIsLoading(true);
    const requestBody = {
      emailOrUsername: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch(urls.baseURL + "auth/login", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: LoginResponse = await response.json();
      setIsLoading(false);

      if (response.ok && data.token) {
        setLoggedIn();
        setUserData(data.token);
        navigate("/");
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setLoginError(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div
            className={styles.imageContainer}
            style={{
              backgroundImage: `url(${loginBG})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.loginForm}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "background.paper",
                padding: "30px 10px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Container component="main" maxWidth="xs">
                <div
                  style={{
                    cursor: "pointer",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  <img alt="Company Logo" src={companyLogo} height={30} />
                </div>
                {loginError && (
                  <h5 style={{ color: lightTheme.palette.error.main }}>
                    {loginError}
                  </h5>
                )}
                <form
                  onSubmit={handleSubmit}
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!formData.usernameError}
                    helperText={formData.usernameError}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!formData.passwordError}
                    helperText={formData.passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.rememberMe}
                        onChange={handleCheckboxChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    color="primary"
                    endIcon={
                      isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ArrowForwardIos />
                      )
                    }
                  >
                    Login
                  </Button>
                  <div
                    className={styles.linkContainer}
                    style={{ marginTop: "16px", textAlign: "center" }}
                  >
                    <Link
                      variant="body2"
                      onClick={() => navigate("/register")}
                      style={{
                        color: lightTheme.palette.primary.main,
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      Don’t have an account? Register
                    </Link>
                  </div>
                </form>
              </Container>
            </Paper>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
