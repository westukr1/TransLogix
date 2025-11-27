# Passenger App Folder Overview

This folder contains an Expo-based React Native starter app that uses Expo Router for navigation and themed UI helpers.

## Key project files
- `package.json`: Defines the Expo app entry (`expo-router/entry`), scripts for starting or resetting the project, and React Native dependencies like `expo`, `expo-router`, and React Navigation.
- `app.json`: Expo project configuration (name, slug, and basic metadata).
- `tsconfig.json` and `eslint.config.js`: TypeScript and ESLint configuration.
- `scripts/reset-project.js`: Moves the starter code into `app-example` and leaves an empty `app` directory for a fresh start.

## App directory structure
- `app/_layout.tsx`: Wraps the navigation stack with a theme provider and defines a modal route.
- `app/modal.tsx`: Example modal screen using themed components and a link back to the home screen.
- `app/(tabs)/_layout.tsx`: Sets up a three-tab navigator (Home, Explore, Requests) with haptic tab buttons and themed colors.
- `app/(tabs)/index.tsx`: Home screen with a parallax header, welcome text, and links (including one to the Requests tab).
- `app/(tabs)/explore.tsx`: Explore screen demonstrating collapsible sections, external links, and theme-aware styling.
- `app/(tabs)/requests.tsx`: Placeholder screen for displaying user requests.

## Shared utilities and components
- `constants/theme.ts`: Light/dark color palettes and platform-aware font definitions.
- `components/`: Reusable UI pieces like haptic tab buttons, themed text/view wrappers, a parallax scroll view, external links, and icon helpers.
- `hooks/`: Theme helper hooks including `useColorScheme` used throughout navigation layouts.
- `assets/`: Static images used by the starter screens (e.g., React logo artwork).

## Getting started
Run `npm install` followed by `npx expo start` to launch the development server. Use the bottom tabs to navigate between the Home, Explore, and Requests screens; open `/modal` to see the example modal route.
