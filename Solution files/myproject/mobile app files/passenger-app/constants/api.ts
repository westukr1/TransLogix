import Constants from 'expo-constants';

// Development fallback: update this to your machine's LAN IP so physical devices and emulators
// can reach the Django backend over the network. Avoid using localhost/127.0.0.1 because that
// points to the device/emulator itself.
const devFallback = 'http://192.168.0.100:8000';

const expoConfigBaseUrl =
  Constants.expoConfig?.extra?.apiBaseUrl ?? Constants.manifest?.extra?.apiBaseUrl;

// Prefer the public environment variable if provided, otherwise fall back to Expo config, then
// the development placeholder. Replace the fallback with your backend's reachable URL.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || expoConfigBaseUrl || devFallback;
