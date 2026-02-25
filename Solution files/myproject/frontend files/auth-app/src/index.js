import React from "react";
import { createRoot } from "react-dom/client";
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
      <AppRouter />
    </React.StrictMode>
  );
}

bootstrap();