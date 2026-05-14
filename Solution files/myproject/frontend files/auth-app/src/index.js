import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import AppRouter from "./App";
import { loadRuntimeConfig, getRuntimeConfig } from "./runtimeConfig";

async function bootstrap() {
  await loadRuntimeConfig(); // підтягуємо config.json ДО старту React

  // необов’язково, але корисно для перевірки:
  console.log("Runtime config:", getRuntimeConfig());

  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      {/* Auth0Provider makes the official Auth0 React SDK available through useAuth0().
          This is additive: the existing Django JWT username/password flow stays intact. */}
      <Auth0Provider
        domain="translogix.eu.auth0.com"
        clientId="ZmF3typFHyukzvwsQZcaGSgErvL8c7di"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <AppRouter />
      </Auth0Provider>
    </React.StrictMode>
  );
}

bootstrap();
