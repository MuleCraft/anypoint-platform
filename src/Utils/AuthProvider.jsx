// AuthProvider.js
import React, { createContext, useContext, useState } from "react";
import { UserProvider } from "./UserContext"; // Import UserProvider

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = (userToken, user) => {
    setToken(userToken);
    setUserData(user);
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <UserProvider>{children}</UserProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
