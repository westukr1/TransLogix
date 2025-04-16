import React, { useState, useEffect } from 'react'; 
import '../styles/MainContent.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { API_ENDPOINTS } from '../config/apiConfig';

function MainContent() {
  const { t } = useTranslation();
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [showTodayOnly, setShowTodayOnly] = useState(true);
  const [activeButton, setActiveButton] = useState('today');

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const filterTodayRoutes = () => {
    const today = new Date();
    
    const todayRoutes = routes.filter(route => {
      const routeDateTime = new Date(route.date);
      const routeDate = new Date(routeDateTime.getFullYear(), routeDateTime.getMonth(), routeDateTime.getDate());
  
      return (
        routeDate.getDate() === today.getDate() &&
        routeDate.getMonth() === today.getMonth() &&
        routeDate.getFullYear() === today.getFullYear()
      );
    });
  
    setFilteredRoutes(todayRoutes);
    setShowTodayOnly(true);
    setActiveButton('today');
  };
  
  const showAllRoutes = () => {
    setFilteredRoutes(routes);
    setShowTodayOnly(false);
    setActiveButton('all');
  };

  const getRouteClass = (routeDate) => {
    const today = new Date();
    const routeDateTime = new Date(routeDate);
    const isToday = routeDateTime.toDateString() === today.toDateString();
    const isFuture = routeDateTime > today;
    
    if (isToday) {
      return 'route-label-today';
    } else if (isFuture) {
      return 'route-label-future';
    } else {
      return 'route-label-past';
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? hours + ' ' + t('hours') : ''} ${remainingMinutes > 0 ? remainingMinutes + ' ' + t('minutes') : ''}`.trim();
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getRoutes);
        if (Array.isArray(response.data)) {
          setRoutes(response.data);
        } else {
          setRoutes([]);
        }
      } catch (error) {
        console.error('Помилка отримання маршрутів:', error);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (routes.length > 0) {
      filterTodayRoutes();
    }
  }, [routes]);
  
  useEffect(() => {
    if (routes.length > 0) {
      filterTodayRoutes();
    }
  }, [routes]);
   // Функція для форматування розпарсених адрес
   const formatParsedAddress = (address) => {
    const country = address?.country || '';
    const region = address?.region  || '';
    const city = address?.city || '';
    const street = address?.street || '';
    const houseNumber = address?.house_number || '';
  
    // Формат адреси з урахуванням того, що деякі частини можуть бути відсутні
    return `${houseNumber}, ${street}, ${city}, ${region}, ${country}`.replace(/, ,/g, '').trim();
  };
  

  return (
    <main className="main-content">
      <h3>
        {t('todays_routes')}, 
        <span className="date-time-container">{getCurrentDateTime()}</span>
      </h3>

      <div className="route-buttons">
          
          <Link to="/routestableview" className="btn-today filter-button">{t('table_view')}</Link>
          <button className="btn-today filter-button">{t('show_on_map')}</button>
          <button className="btn-today filter-button">{t('message_driver')}</button>
          <button 
            onClick={showAllRoutes} 
            className={`btn-all-routes filter-button ${activeButton === 'all' ? 'text-active' : ''}`}
          >
            {t('all_routes')}
          </button>
          <button 
            onClick={filterTodayRoutes} 
            className={`btn-today filter-button ${activeButton === 'today' ? 'text-active' : ''}`}
          >
            {t('today_routes')}
          </button>
        
      </div>

      <div className="routes-list">
        <div className="content-area">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, index) => (
              <div key={index} className="route-item">
                <span className={`route-label ${getRouteClass(route.date)}`}>{t('route_number')}:</span> 
          	    <span className="route-data">{route.route_number} • </span>

          	    <span className={`route-label ${getRouteClass(route.date)}`}>{t('origin_city')}:</span> 
         	      <span className="route-data">{route.start_point.city} • </span>

         	      <span className={`route-label ${getRouteClass(route.date)}`}>{t('destination_city')}:</span> 
          	    <span className="route-data">{route.end_point.city} • </span>

          	    <span className={`route-label ${getRouteClass(route.date)}`}>{t('date')}:</span> 
          	    <span className="route-data">{route.date} • </span>

          	    <span className={`route-label ${getRouteClass(route.date)}`}>{t('distance')}:</span> 
          	    <span className="route-data">{route.distance} km • </span>

          	    <span className={`route-label ${getRouteClass(route.date)}`}>{t('estimated_time')}:</span> 
          	    <span className="route-data"> {formatTime(route.estimated_time)} • </span>
                
                <input type="checkbox" className="route-checkbox" />
                <button className="btn-details">{t('details')}</button>
              </div>
            ))
          ) : (
            <p>{t('no_routes_found')}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainContent;

