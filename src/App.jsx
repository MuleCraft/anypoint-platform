import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPageComingSoon from "./pages/UseCustomDomainPageComingSoon";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import { AuthProvider } from "./Utils/AuthProvider";
import AMBusinessGroup from "./pages/Access-Management/AM-businessGroup";
import InviteUserPasswordPage from "./pages/InvitedUserPassword";
import InviteUserDatailPage from "./pages/InviteUserDetailsForm";
import RunTimeManager from "./pages/Runtime-Manager/Application-main";
import ApplicationSandbox from "./pages/Runtime-Manager/Sandbox-pages/ApplicationSandbox";
import DeployApplicationSandbox from "./pages/Runtime-Manager/Sandbox-pages/Deploy-application";
import AMSettingBreadcrumb from "./pages/Access-Management/AM-SettingBreadcrumb";
import AMChildGroup from "./pages/Access-Management/AM-childGroup";
import AMEnvironment from "./pages/Access-Management/AM-environment";
import AMUserList from "./pages/Access-Management/Users/AM-userList";
import AMUserBreadcrumb from "./pages/Access-Management/Users/AM-UserNameBreadcrumb";
import AMPending from "./pages/Access-Management/Users/AM-pending";
import AMTeams from "./pages/Access-Management/Teams/AM-teams";
import AMTeamsSettings from "./pages/Access-Management/Teams/AM-settings";
import AMTeamsLimits from "./pages/Access-Management/Teams/AM-Limits";
import AMChildTeams from "./pages/Access-Management/Teams/AM-childTeams";
import AMMenbers from "./pages/Access-Management/Teams/AM-members";
import AMPermissions from "./pages/Access-Management/Teams/AM-permissions";
import AMAccessOverview from "./pages/Access-Management/Business-Group/AM-accessOverview";

export default function App() {
  const AccessManagement = "Access Management";
  const AnypointPlatform = "Anypoint Platform";
  const RuntimeManager = "Runtime Manager";
  const AccessManagentPath = "/accounts/users";
  const RuntimeManagerPath = "/cloudhub/design/home/applications";
  return (
    <Router>
      <AuthProvider>
        <Routes path="/accounts/*">
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="use-custom-domain"
            element={<UseCustomDomainPageComingSoon />}
          />
          <Route path="inviteduser" element={<InviteUserPasswordPage />} />
          <Route
            path="inviteduserdetails/:id"
            element={<InviteUserDatailPage />}
          />
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
            <Route
              path="accounts/users/:id"
              element={
                <AMUserBreadcrumb
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />

            <Route
              path="/accounts/teams/:id/settings"
              element={
                <AMTeamsSettings
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/teams/"
              element={
                <AMTeams
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/teams/:id/limits"
              element={
                <AMTeamsLimits
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/teams/:id/child_teams"
              element={
                <AMChildTeams
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/teams/:id/users"
              element={
                <AMMenbers
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="/accounts/teams/:id/permissions"
              element={
                <AMPermissions
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
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
              path="accounts/businessGroups/:id"
              element={
                <AMSettingBreadcrumb
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="accounts/businessGroups/:id/access"
              element={
                <AMAccessOverview
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="accounts/businessGroups/:id/children"
              element={
                <AMChildGroup
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
            <Route
              path="accounts/businessGroups/:id/environments"
              element={
                <AMEnvironment
                  name={AccessManagement}
                  pathValue={AccessManagentPath}
                />
              }
            />
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
            <Route
              path="/cloudhub/design/home/applications"
              element={
                <RunTimeManager
                  name={RuntimeManager}
                  pathValue={RuntimeManagerPath}
                />
              }
            />
            <Route
              path="/cloudhub/sandbox/home/applications"
              element={
                <ApplicationSandbox
                  name={RuntimeManager}
                  pathValue={RuntimeManagerPath}
                />
              }
            />
            <Route
              path="/cloudhub/sandbox/home/applications/addapplication"
              element={
                <DeployApplicationSandbox
                  name={RuntimeManager}
                  pathValue={RuntimeManagerPath}
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
