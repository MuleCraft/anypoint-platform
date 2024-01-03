import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "./supabase";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userData, setUserData] = useState(null);
  const login = async (userToken, loggedInUsername) => {
    setToken(userToken);
    localStorage.setItem("authToken", JSON.stringify(userToken));
    try {
      const { data, error } = await supabase
        .schema("mc_cap_dev")
        .from("capUsers")
        .select("id, userFullname, userName, userCompany")
        .eq("userName", loggedInUsername);
      if (data) {
        setUserData(data.length === 1 ? data[0] : data);
      } else {
        console.error("Error fetching user data:", error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("authToken");
  };
  const isAuthenticated = !!token;
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        if (parsedToken && parsedToken.userId) {
          try {
            const { data, error } = await supabase
              .schema("mc_cap_dev")
              .from("capUsers")
              .select("id, userFullname, userName, userCompany")
              .eq("id", parsedToken.userId);
            if (data) {
              setUserData(data[0]);
            } else {
              console.error("Error fetching user data:", error);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
