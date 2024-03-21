
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPage from "./pages/UseCustomDomainPage";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import { AuthProvider } from "./Utils/AuthProvider";
import AMTeams from "./pages/Access-Management/AM-teams";
import AMBusinessGroup from "./pages/Access-Management/AM-businessGroup";
import AMUserList from "./pages/Access-Management/AM-userList";
import AMPending from "./pages/Access-Management/AM-pending";
import AMPublic from "./pages/Access-Management/AM-publicPortalAccess";

export default function App() {
  const AccessManagement = "Access Management";
  const AnypointPlatform = "Anypoint Platform";
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="use-custom-domain" element={<UseCustomDomainPage />} />
          <Route
            element={<PrivateRoutes />}
          >

          </Route>
          <Route path="/home/organisations" element={<Home name={AnypointPlatform} />} />
          <Route path="/accounts/users" element={<AMUserList name={AccessManagement} />} />
          <Route path="/accounts/teams" element={<AMTeams name={AccessManagement} />} />
          <Route path="accounts/businessGroups" element={<AMBusinessGroup name={AccessManagement} />} />
          <Route path="/accounts/users/list" element={<AMUserList name={AccessManagement} />} />
          <Route path="/accounts/users/pending" element={<AMPending name={AccessManagement} />} />
          <Route path="/accounts/users/external" element={<AMPublic name={AccessManagement} />} />
          <Route path="login/new-password" element={<ResetPassword />} />
          <Route path="login/retrieve-username" element={<ForgotPasswordPage />} />
          <Route path="login/new-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
