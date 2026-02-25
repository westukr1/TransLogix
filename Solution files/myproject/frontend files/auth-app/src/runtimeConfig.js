// src/runtimeConfig.js

let runtimeConfig = {
  apiBaseUrl: "/api"
};

export async function loadRuntimeConfig() {
  try {
    const res = await fetch("/config.json", { cache: "no-store" });
    if (!res.ok) return runtimeConfig;

    const json = await res.json();
    runtimeConfig = { ...runtimeConfig, ...json };
    return runtimeConfig;
  } catch (e) {
    return runtimeConfig;
  }
}

export function getRuntimeConfig() {
  return runtimeConfig;
}