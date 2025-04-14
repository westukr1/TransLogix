import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MapOfRoutes.css';
import axios from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../config/apiConfig';

function MapOfRoutes() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const mapRef = useRef(null); // Використовується для відображення карти
  const navigate = useNavigate();

  // Завантажуємо Google Maps API
  const loadGoogleMapsAPI = (apiKey, callback) => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
      script.onload = () => {
        if (callback) callback();
      };
      script.onerror = () => {
        console.error("❌ Помилка при завантаженні Google Maps API");
      };
    } else if (callback) {
      callback();
    }
  };
  

  useEffect(() => {
    const fetchAndLoadGoogleMaps = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getGoogleMapsKey);
        const apiKey = response.data.google_maps_api_key;
  
        loadGoogleMapsAPI(apiKey, () => {
          if (mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 49.8397, lng: 24.0297 },
              zoom: 10,
            });
  
            new window.google.maps.Marker({
              position: { lat: 49.8397, lng: 24.0297 },
              map: map,
              title: "Львів",
            });
          }
        });
      } catch (error) {
        console.error("❌ Не вдалося отримати Google Maps ключ:", error);
      }
    };
  
    fetchAndLoadGoogleMaps();
  }, []);
  

  const routes = [
    {
      id: 1,
      name: 'Route 1',
      status: 'in-progress',
      passengers: [
        { name: 'John Doe', city: 'Kyiv', phone: '+380 123 456 789' },
        { name: 'Jane Smith', city: 'Lviv', phone: '+380 987 654 321' },
      ],
    },
    {
      id: 2,
      name: 'Route 2',
      status: 'scheduled',
      passengers: [
        { name: 'Alice Brown', city: 'Odessa', phone: '+380 555 555 555' },
      ],
    },
  ];

  const handleRouteClick = (route) => {
    setSelectedRoute(selectedRoute === route ? null : route);
  };

  return (
    <div className="map-of-routes-container">
      <div className="header">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Main Screen</Link>
          <Link to="/calendar" className="nav-button">Calendar</Link>
          <Link to="/drivers" className="nav-button">Driver Manager</Link>
          <Link to="/rout-manager" className="nav-button">Rout Manager</Link>
          <button onClick={() => navigate(-1)} className="nav-button">Back</button>
        </div>
        <div className="date-time">
          {new Date().toLocaleString()}
        </div>
      </div>

      <div className="content">
        <div className="sidebar">
          <div className="routes-list">
            <h2>Active Routes</h2>
            <ul>
              {routes.map(route => (
                <li key={route.id} className="route-item" onClick={() => handleRouteClick(route)}>
                  <span className={`status-icon ${route.status}`}></span>
                  <span>{route.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="passenger-list">
            <h2>Passengers</h2>
            {selectedRoute ? (
              <ul>
                {selectedRoute.passengers.map((passenger, index) => (
                  <li key={index} className="passenger-item">
                    <span>{passenger.name}, {passenger.city}</span>
                    <span className="phone-number">{passenger.phone}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Select a route to see passengers</p>
            )}
          </div>
        </div>

        <div className="map-section">
          <div ref={mapRef} className="map-container" style={{ height: '500px', width: '100%' }}></div>
        </div>

        <div className="filters-section">
          <h2>Filters</h2>
          <div className="filter-group">
            <label>Route:</label>
            <input type="text" placeholder="Enter route" />
          </div>
          <div className="filter-group">
            <label>Vehicle:</label>
            <input type="text" placeholder="Enter vehicle" />
          </div>
          <div className="filter-group">
            <label>Passenger:</label>
            <input type="text" placeholder="Enter passenger" />
          </div>
          <div className="filter-group">
            <label>Direction:</label>
            <select>
              <option value="to-work">To Work</option>
              <option value="home">Home</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Time Interval:</label>
            <input type="datetime-local" placeholder="Start" />
            <input type="datetime-local" placeholder="End" style={{ marginTop: '10px' }} />
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapOfRoutes;
