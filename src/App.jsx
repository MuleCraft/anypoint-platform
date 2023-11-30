import React from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import UseCustomDomainPage from "./pages/useCustomDomainPage";
import Home from "./pages/Home";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="use-custom-domain" element={<UseCustomDomainPage />} />
        <Route path="home/organisation" element={<Home />} />
        <Route
          path="login/retrieve-username"
          element={<ForgotPasswordPage />}
        />
      </Routes>
    </Router>
  );
}
