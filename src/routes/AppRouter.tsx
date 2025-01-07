import { useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "../services/store/auth/authStore";

const AppRouter = () => {
  // const location = useLocation();
  // const userDataString = getUserData();

  // const isLoginPage = location.pathname === '/login';
  // const isVerifyEmail = location.pathname.split('/').slice(0, 2).join('/') === '/verify-email';
  // const isRegisterPage = location.pathname === '/register';
  // const isSetupUser = location.pathname === '/setupuser';
  // const pathLocation = location.pathname === '/' ? 'home' : location.pathname;

  // function extractTextsFromPath(str: any) {
  //   const parts = str.split('/');
  //   const primaryText = parts[1]?.replace(/([a-z])([A-Z])/g, '$1 $2');
  //   const secondaryText = parts[2]?.replace(/([a-z])([A-Z])/g, '$1 $2');
  //   return { primaryText, secondaryText };
  // }
  // const { primaryText, secondaryText } = extractTextsFromPath(pathLocation);

  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isShareLinkPage = location.pathname.startsWith("/shareLink");

  useEffect(() => {
    if (!isLoggedIn && !isShareLinkPage) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <AppLayout>
      <div>
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
            path="/verify-email/:token"
            element={
              // <PublicRoutes>
              <VerifyUser />
              // </PublicRoutes>
            }
          />
          <Route
            path="/shareLink/:token"
            element={
              // <PublicRoutes>
              <ShareLinkPage />
              // </PublicRoutes>
            }
          />
          {/* <Route
            path="/register"
            element={
              <PublicRoutes>
                <RegisterForm />
              </PublicRoutes>
            }
          /> */}

          <Route path="/setupuser" element={<CreateUserPage />} />
          <Route
            index
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          {/* <Route
            path="/Report/ViewReports"
            element={
              <ProtectedRoutes>
                <ViewReports />
              </ProtectedRoutes>
            }
          /> */}
          <Route
            path="/Report/ManageReports"
            element={
              <ProtectedRoutes>
                <ManageReportsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Report/ReportUsage"
            element={
              <ProtectedRoutes>
                <ReportUsagePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/GroupManagement/EditGroup"
            element={
              <ProtectedRoutes>
                <EditGroup />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/UserManagement/ManageReports"
            element={
              <ProtectedRoutes>
                <ManageReports />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/UserManagement/ManageUsers"
            element={
              <ProtectedRoutes>
                <CreateUser />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/PowerBI/Report/:creditionals"
            element={
              <ProtectedRoutes>
                <PowerBIReport />
              </ProtectedRoutes>
            }
          />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AppLayout>
  );
};

interface RouteProps {
  children: ReactNode;
}
// ProtectedRoutes component

const ProtectedRoutes = ({ children }: RouteProps) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  // Check if the current URL path includes '/sharelink'
  const isShareLinkPage = location.pathname.startsWith("/shareLink");

  if (!isLoggedIn && !isShareLinkPage) {
    return <Navigate to="/login" />; // Redirect to /login if not authenticated and not on shareLink
  }

  return children;
};

const PublicRoutes = ({ children }: RouteProps) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" />; // Redirect to AccessPage if not authenticated
  }

  return children;
};
export default AppRouter;
