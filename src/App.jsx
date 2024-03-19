import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPage from "./pages/UseCustomDomainPage";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import { AuthProvider } from "./Utils/AuthProvider";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="use-custom-domain" element={<UseCustomDomainPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home/organisations" element={<Home />} />
          </Route>
          <Route path="login/new-password" element={<ResetPassword />} />
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
