import { createContext, useState, useEffect } from "react";
import supabase from "./supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem("session");
    return storedSession ? JSON.parse(storedSession) : null;
  });

  useEffect(() => {
    const handleAuthStateChange = (_event, session) => {
      setSession(session);
      localStorage.setItem("session", JSON.stringify(session));
    };

    const authSubscription = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    // Retrieve initial session
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
    <AuthContext.Provider value={{ session, setSession, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
