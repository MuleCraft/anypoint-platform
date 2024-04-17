import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPage from "./pages/UseCustomDomainPage";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import { AuthProvider } from "./Utils/AuthProvider";
import AMBusinessGroup from "./pages/Access-Management/AM-businessGroup";
import AMBusinessGroupDetails from "./pages/Access-Management/AM-businessGroupDetails";
import AMUserList from "./pages/Access-Management/AM-userList";
import AMPending from "./pages/Access-Management/AM-pending";
import InviteUserPasswordPage from "./pages/InvitedUserPassword";
import InviteUserDatailPage from "./pages/InviteUserDetailsForm";
import AMUserBreadcrumb from "./pages/Access-Management/AM-UserNameBreadcrumb";

export default function App() {
  const AccessManagement = "Access Management";
  const AnypointPlatform = "Anypoint Platform";
  const AccessManagentPath = "/accounts/users";
  return (
    <Router>
      <AuthProvider>
        <Routes path="/accounts/*">
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="use-custom-domain" element={<UseCustomDomainPage />} />
          <Route path="inviteduser" element={<InviteUserPasswordPage />} />
          <Route path="inviteduserdetails/:id" element={<InviteUserDatailPage />} />
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route
              path="/home/organisations"
              element={
                <Home name={AnypointPlatform} pathValue="/home/organisations" />
              }
            />
            <Route
              path="/accounts/users"
              element={
                <AMUserList
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route path="accounts/users/:id" element={<AMUserBreadcrumb name={AccessManagement} pathValue={AccessManagentPath} />} />
            <Route
              path="accounts/businessGroups"
              element={
                <AMBusinessGroup
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="accounts/businessGroups/:groupCode"
              element={<AMBusinessGroupDetails name={AccessManagement} pathValue={AccessManagentPath} />} />
            <Route
              path="/accounts/users/list"
              element={
                <AMUserList
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/users/pending"
              element={
                <AMPending
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
          </Route>
          <Route
            path="login/retrieve-username"
            element={<ForgotPasswordPage />}
          />
          <Route path="login/new-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
