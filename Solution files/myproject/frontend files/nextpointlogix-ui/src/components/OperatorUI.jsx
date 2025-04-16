import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import '../styles/OperatorUI.css';
import i18n from '../i18n';  
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { API_ENDPOINTS } from '../config/apiConfig';


const OperatorUI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [passengers, setPassengers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Отримуємо мову з URL-параметра
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const language = searchParams.get('lang');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken); 
      //console.log('Access token saved in localStorage: ' + accessToken); 
    } else {
      //console.log('Access token not found in URL');
    }

    if (language) {
      i18n.changeLanguage(language);  
      localStorage.setItem('language', language);
      //console.log('Language set to: ' + language);
    } else {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);  
      }
    }
    // Запит на отримання user_id та його збереження
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await axios.get(API_ENDPOINTS.getUserInfo); // <-- новий ендпоінт
          localStorage.setItem('user_id', response.data.id);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    

    fetchUserId();
  }, [location]);
  

  // Запит на отримання списку пасажирів з бекенду
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getPassengers(true)); // is_active=true
        setPassengers(response.data);
      } catch (error) {
        console.error('Помилка отримання пасажирів:', error);
      }
    };
  
    fetchPassengers();
  }, []);
  

  // Функція для пошуку за будь-яким текстом
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

    // Функція для форматування адреси (вибираємо першу адресу з pickup_addresses)

  const formatParsedAddress = (passenger) => {
      // Лог даних пасажира
    // console.log("Пасажир:", passenger);
    // Якщо адреса є окремими полями
    if (passenger && passenger.city && passenger.street && passenger.house_number) {
      // console.log("Обробляємо адресу безпосередньо з об'єкта пасажира");

      const { region, city, street, house_number , district } = passenger;

      const formattedAddress = [
        street,
        house_number,
        city,
        region,
        district,
      ].filter(Boolean).join(', ');

      // console.log("Сформована адреса:", formattedAddress);
      return formattedAddress || 'Адреса не вказана';
    }
      // Перевіряємо, чи є масив pickup_addresses і чи він не порожній
    if (passenger.pickup_addresses && passenger.pickup_addresses.length > 0) {
          // Отримуємо першу адресу посадки з масиву pickup_addresses
        const firstPickupAddress = passenger.pickup_addresses[0];
        // console.log("Перша адреса посадки:", firstPickupAddress);
  
          // Форматуємо адресу з полів адреси
        const { street, house_number, city, region, district} = firstPickupAddress;
  
          // Створюємо форматовану адресу
        const formattedAddress = [
            street,
            house_number,
            city,
            region,
            district,

        ].filter(Boolean).join(', ');
  
        // console.log("Сформована адреса:", formattedAddress);
  
          // Повертаємо відформатовану адресу або повідомлення, що адреса не вказана
        return formattedAddress || 'Адреса не вказана';
    } else {
          // Якщо pickup_addresses відсутній або порожній
        //console.log("Адреса не знайдена для пасажира:", passenger);
        return 'Адреса не вказана';
    }
  };
  const handleDoubleClick = (passengerId) => {
    navigate(`/edit-passenger-addresses`, { state: { passengerId } });
  };


  const filteredPassengers = passengers.filter((passenger) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      passenger.first_name.toLowerCase().includes(searchValue) ||
      passenger.last_name.toLowerCase().includes(searchValue) ||
      formatParsedAddress(passenger).toLowerCase().includes(searchValue) || // Пошук по першій адресі посадки
      passenger.phone_number.toLowerCase().includes(searchValue) ||
      passenger.department.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="three-column-template">
      <Header />
      <div className="template3-content">
        <div className="template3-left-column">
          <Sidebar /> 
        </div>

        <div className="template3-center-column">
          <MainContent /> 
        </div>

        <div className="template3-right-column">
          <h2>{t('passenger_list')}</h2>
          <div className="route-buttons">
          
            <Link to="/passangers-tableview" className="btn-today filter-button">{t('table_view')}</Link> {/* Виправлено для навігації */}
            <Link to="/create-passenger" className="btn-today filter-button">{t('add_passenger')}</Link> {/* Виправлено для навігації */}
            
          </div>
          <div className="passenger-controls">
            <input 
              type="text" 
              placeholder={t('search')} 
              value={searchQuery} 
              onChange={handleSearch} 
              className="search-input" 
            />
          </div>
          <div className="passenger-scroll">
            {filteredPassengers.map((passenger) => (
              <div 
                key={passenger.id} 
                className="passenger-item" 
                onDoubleClick={() => handleDoubleClick(passenger.id)}
              >
                <p> {passenger.first_name} {passenger.last_name}, ID: {passenger.id}, {formatParsedAddress(passenger)}</p>
                <button className="btn-phone">{passenger.phone_number}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OperatorUI;
