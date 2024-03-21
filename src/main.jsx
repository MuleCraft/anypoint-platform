import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./assets/theme.jsx";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "./Utils/supabase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
