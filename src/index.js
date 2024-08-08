import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="878794834236-2p4ltevecismr4gjtmev2o3528l589d0.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
