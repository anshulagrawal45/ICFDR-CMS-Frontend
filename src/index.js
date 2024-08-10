import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./Components/Features/StaticPages/ErrorReload";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="390139244489-92v6mqj5oljo5a6iago8q8445eu35lpd.apps.googleusercontent.com">
    <ErrorBoundary>  
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
    </ErrorBoundary>
  </GoogleOAuthProvider>
);
