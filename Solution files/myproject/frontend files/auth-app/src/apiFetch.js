import { getRuntimeConfig } from "./runtimeConfig";

export async function apiFetch(path, options = {}) {
  const { apiBaseUrl } = getRuntimeConfig();

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${apiBaseUrl}${normalizedPath}`;

  return fetch(url, options);
}