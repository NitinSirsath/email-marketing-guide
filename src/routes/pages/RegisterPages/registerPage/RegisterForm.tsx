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
import registerBG from "../../../../assets/loginbg.svg";

// Define interfaces for FormData and API responses
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  rememberMe: boolean;
}

interface APIResponse {
  success?: boolean;
  token?: string;
  error?: string;
}

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#555555" },
  },
});

const RegisterInterface: React.FC = () => {
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameError = formData.username ? "" : "Username is required";
    const emailError = formData.email
      ? validateEmail(formData.email)
      : "Email is required";
    const passwordError = formData.password ? "" : "Password is required";
    const confirmPasswordError =
      formData.password === formData.confirmPassword
        ? ""
        : "Passwords do not match";

    setFormData((prev) => ({
      ...prev,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    }));

    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      handleRegister();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      [`${event.target.name}Error`]: "",
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

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const requestBody = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(urls.baseURL + "auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      const data: APIResponse = await response.json();
      setIsLoading(false);

      if (response.ok) {
        handleLogin();
      } else {
        setRegisterError(data.error || "Registration failed");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setRegisterError(errorMessage);
    }
  };

  const handleLogin = async () => {
    const requestBody = {
      emailOrUsername: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(urls.baseURL + "auth/login", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      const data: APIResponse = await response.json();

      if (response.ok && data.token) {
        setLoggedIn();
        setUserData(data.token);
        navigate("/");
      } else {
        console.error("Login after registration failed:", data.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error:", errorMessage);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div
            className={styles.imageContainer}
            style={{
              backgroundImage: `url(${registerBG})`,
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
                {registerError && (
                  <h5 style={{ color: lightTheme.palette.error.main }}>
                    {registerError}
                  </h5>
                )}
                <form
                  onSubmit={handleSubmit}
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  {/* Input fields */}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!formData.usernameError}
                    helperText={formData.usernameError}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formData.emailError}
                    helperText={formData.emailError}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!formData.passwordError}
                    helperText={formData.passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!formData.confirmPasswordError}
                    helperText={formData.confirmPasswordError}
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
                  {/* Submit button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                    }}
                    endIcon={
                      isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ArrowForwardIos />
                      )
                    }
                  >
                    Register
                  </Button>
                  <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <Link
                      variant="body2"
                      onClick={() => navigate("/login")}
                      style={{
                        color: lightTheme.palette.primary.main,
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      Already have an account? Login
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

export default RegisterInterface;
