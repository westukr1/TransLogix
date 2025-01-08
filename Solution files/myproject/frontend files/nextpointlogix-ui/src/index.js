import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';  // Імпорт конфігурації i18n

// Завантаження Google Maps API
const loadGoogleMapsAPI = (callback) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCEryINvh8xazxGl6X_FXix5aUP17-9gsI`;
    script.id = 'googleMaps';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  } else if (callback) callback();
};

loadGoogleMapsAPI(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Якщо потрібно, можна вимірювати продуктивність
reportWebVitals();
