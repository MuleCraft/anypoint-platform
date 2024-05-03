import { createContext, useState, useEffect } from "react";
import supabase from "./supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem("session");
    return storedSession ? JSON.parse(storedSession) : null;
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .schema("mc_cap_develop")
          .from("users")
          .select("full_name, display_name, company,email, id,organizationId")
          .eq("id", session.user.id)
          .single();

        if (error) {
          throw error;
        }

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();

    const handleAuthStateChange = (_event, session) => {
      setSession(session);
      localStorage.setItem("session", JSON.stringify(session));
    };
    const authSubscription = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );
    const initialSession = supabase.auth.getSession();
    if (initialSession) {
      setSession(initialSession);
      localStorage.setItem("session", JSON.stringify(initialSession));
    }
    return () => {
      if (
        authSubscription &&
        typeof authSubscription.unsubscribe === "function"
      ) {
        authSubscription.unsubscribe();
      }
    };
  }, []);
  const refreshSession = async () => {
    try {
      const refreshedSession = await supabase.auth.refreshSession();
      setSession(refreshedSession);
      localStorage.setItem("session", JSON.stringify(refreshedSession));
    } catch (error) {
      console.error("Error refreshing session:", error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ session, setSession, refreshSession, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
