import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // автоматично підтягне з .env
  headers: {
    'Content-Type': 'application/json'
  }
});

// Додаємо токен і session ID до кожного запиту (якщо є)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const sessionId = localStorage.getItem('session_id');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (sessionId) {
      config.headers['Session-ID'] = sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

