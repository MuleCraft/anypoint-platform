import { createContext, useState, useEffect } from "react";
import supabase from "./supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const handleAuthStateChange = (_event, session) => {
      setSession(session);
    };

    const authSubscription = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    const initialSession = supabase.auth.getSession();
    if (initialSession) {
      setSession(initialSession);
    }

    setSubscription(authSubscription);

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
