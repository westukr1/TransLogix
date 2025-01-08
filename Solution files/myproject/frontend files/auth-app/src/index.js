import React from 'react';
import { createRoot } from 'react-dom/client'; // Імпортуємо createRoot
import './index.css';
import AppRouter from './App'; // Імпортуємо AppRouter

const container = document.getElementById('root');
const root = createRoot(container); // Створюємо root тільки один раз

// Використовуємо root.render для рендерингу компоненту
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
