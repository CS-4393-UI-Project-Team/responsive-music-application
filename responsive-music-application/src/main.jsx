import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import PlayerContextProvider from "./context/PlayerContext.jsx";

// Retrieve Auth0 credentials from environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
