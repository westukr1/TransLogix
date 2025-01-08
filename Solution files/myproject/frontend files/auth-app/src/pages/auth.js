export const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    try {
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh_token }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Оновлюємо access token
        localStorage.setItem('access_token', data.access);
      } else {
        console.error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };
  