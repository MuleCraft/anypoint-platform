import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPage from "./pages/UseCustomDomainPage";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login/:code" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="use-custom-domain" element={<UseCustomDomainPage />} />

        <Route
          path="login/retrieve-username"
          element={<ForgotPasswordPage />}
        />
        <Route path="login/new-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
