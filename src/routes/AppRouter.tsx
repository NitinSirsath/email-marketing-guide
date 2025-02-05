import { useEffect, ReactNode } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "../services/store/auth/authStore";
import AppLayout from "../layout/AppLayout";
import SnackbarActions from "../components/toastMessage/SnackbarActions";
import BackdropLoader from "../components/loaders/BackdropLoader";
import NotFoundPage from "./pages/404Page/NotFoundPage";
import HomePage from "./pages/HomePage/Index";
import LoginPage from "./pages/RegisterPages/LoginPage/LoginPage";
import RegisterInterface from "./pages/RegisterPages/registerPage/RegisterForm";
import { getUserData } from "../services/localStorage/authUtils";

const AppRouter = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  console.log(isLoggedIn, getUserData, "getUserData");
  return (
    <AppLayout>
      <SnackbarActions />
      <BackdropLoader />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterInterface />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

interface RouteProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: RouteProps) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

const PublicRoutes = ({ children }: RouteProps) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AppRouter;
