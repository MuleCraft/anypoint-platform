import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lbtsbocemahbdavnlodi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM";
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userData, setUserData] = useState(null);

  const login = async (userToken) => {
    setToken(userToken);
    localStorage.setItem("authToken", JSON.stringify(userToken));

    try {
      const { data, error } = await supabase
        .schema("mc_dev")
        .from("capUsers")
        .select("id, userFullname, userName, userCompany");
      // .eq("userName", loggedInUsername);
      if (data) {
        setUserData(data);
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
    if (!token) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        login(JSON.parse(storedToken));
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure that children is a required node
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};