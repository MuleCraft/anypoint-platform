import supabase from "./supabase";
import { AuthContext } from "./AuthProvider";
import { useContext, useState, useEffect } from "react";

export default async function fetchUserSessionData() {

  const { session } = useContext(AuthContext);
  const [userSessionData, setUserSessionData] = useState(null);
  console.log('session', session);

  useEffect(() => {
    if (session) {
      fetchUserData();
      console.log("session useEffect triggered");
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .schema("mc_cap_develop")
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw error;
      }
      setUserSessionData(data);
      console.log("User data: ", userSessionData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  return userSessionData;
}