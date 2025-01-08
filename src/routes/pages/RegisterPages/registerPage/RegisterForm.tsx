import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  CircularProgress,
} from "@mui/material";
import backgroundSVG from "../../../assets/images/login/background.svg";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  Lock,
  MailOutline,
  ArrowForwardIos,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import styles from "./loginPage.module.css";
import Button from "@mui/material/Button";
import { useBackdropStore } from "../../../services/store/backdropLoaderStore";
import { urls } from "../../../services/apiServices/config/urls";
import { setUserData } from "../../../services/apiServices/config/authUtils";
import { globalConfig } from "../../../config/globalConfig";
import { useAuthStore } from "../../../services/store/auth/authStore";
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  rememberMe: boolean;
}

const RegisterInterface = () => {
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const { setLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      rememberMe: event.target.checked,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = formData.email
      ? validateEmail(formData.email)
      : "Email is required";
    const passwordError = formData.password ? "" : "Password is required";
    const confirmPasswordError = formData.confirmPassword
      ? ""
      : "Confirm Password is required";
    const passwordLengthError =
      formData.password.length >= 8
        ? ""
        : "Password must be at least 8 characters long";
    const passwordMatchError =
      formData.password === formData.confirmPassword
        ? ""
        : "Passwords do not match";
    setFormData({
      ...formData,
      emailError,
      passwordError,
      confirmPasswordError,
    });

    if (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !emailError &&
      !passwordLengthError &&
      !passwordMatchError
    ) {
      handleRegister(formData);
    } else {
      setFormData({
        ...formData,
        emailError: emailError || "",
        passwordError: passwordLengthError || passwordMatchError || "",
      });
    }
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: "",
    });
  };

  const handleRegister = async (formData: any) => {
    const requestBody = {
      email: formData.email,
      password: formData.password,
    };
    setIsLoading(true);

    try {
      const response = await fetch(urls.baseURL + "user/signup", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleLogin(formData);
      } else {
        console.error("Error:", response.statusText);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (formData: any) => {
    showBackdrop();
    const requestBody = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch(urls.baseURL + "user/signin", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setLoggedIn();
      if (data.error) {
        setLoginError(data.error);
      } else {
        navigate("/");
      }
      if (response.ok) {
        setUserData(data.token);
        hideBackdrop();
        navigate("/");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", "error.message");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div
          className={styles.imageContainer}
          style={{
            backgroundImage: `url(${backgroundSVG})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.loginForm}>
          <Container
            component="main"
            maxWidth="xs"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ cursor: "pointer", marginBottom: "10px" }}>
              <img
                alt="error"
                src={globalConfig.clinetConfig.companyLogo}
                height={30}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  color: "#FFC627",
                  fontWeight: 600,
                }}
              >
                {globalConfig.clinetConfig.companyName}
              </Typography>
              <p style={{ fontSize: "12px", color: "grey" }}>
                Start managing your reports faster and better
              </p>
              {loginError !== null && (
                <h5 style={{ color: "#B71C1C" }}>{loginError}</h5>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", marginTop: "8px" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formData.emailError}
                helperText={formData.emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formData.passwordError}
                helperText={formData.passwordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        size="large"
                        aria-label="toggle password visibility"
                      >
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
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!formData.confirmPasswordError}
                helperText={formData.confirmPasswordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        size="large"
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
                    color="secondary"
                  />
                }
                label="Remember me"
                style={{ marginTop: "8px", color: "#555" }}
              />
              <Button
                type="submit"
                fullWidth
                style={{
                  marginTop: "16px",
                  background: "#6058C9",
                }}
                variant="text"
                endIcon={
                  !isLoading ? (
                    <ArrowForwardIos />
                  ) : (
                    <CircularProgress size={20} />
                  )
                }
              >
                Register
              </Button>
              <div className={styles.linkContainer}>
                <Link
                  variant="body2"
                  style={{
                    color: "#555",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  {"Already have an account? Sign In"}
                </Link>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default RegisterInterface;
