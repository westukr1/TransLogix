import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import i18n from 'i18next'; 
import { useLocation } from 'react-router-dom';




const NewEditPassengerForm = ({ onClose, onSave }) => {
  useEffect(() => {
  console.log('Component Loaded');
}, []);
  const { t } = useTranslation(); // Підключаємо переклад
  const navigate = useNavigate();
  // Стани для зберігання країн, регіонів і районів
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const location = useLocation();
  const { passengerId, firstName, lastName, phoneNumber, email } = location.state || {}; // Отримуємо передані дані
  const [italicRows, setItalicRows] = useState(new Set()); // Для зберігання рядків з курсивом
  // Стани для зберігання даних про пасажира і адреси
  // const [passengerData, setPassengerData] = useState({
  
  //   pickupAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'pickup' }],
  //   dropoffAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'dropoff' }],
  //   workAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'work' }],
    
  // });
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    pickupAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'pickup' }],
    dropoffAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'dropoff' }],
    workAddresses: [{ country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'work' }],
  });
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (passengerId) {
      axios.get(`http://localhost:8000/api/passengers/${passengerId}`)
        .then(response => {
          const data = response.data;
          setPassengerData(prevData => ({
            ...prevData,
            ...data,
            pickupAddresses: data.pickupAddresses.length > 0 ? data.pickupAddresses : prevData.pickupAddresses,
            dropoffAddresses: data.dropoffAddresses.length > 0 ? data.dropoffAddresses : prevData.dropoffAddresses,
            workAddresses: data.workAddresses.length > 0 ? data.workAddresses : prevData.workAddresses
          }));
        })
        .catch(error => console.error('Помилка при завантаженні даних пасажира:', error));
    } else {
      setPassengerData(prevState => ({
        ...prevState,
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phoneNumber || '',
        email: email || ''
      }));
    }
  }, [passengerId, firstName, lastName, phoneNumber, email]);

  // Логування для перевірки масивів після ініціалізації
useEffect(() => {

  console.log('Ініціалізовані дані пасажира:', passengerData);
}, [passengerData]);


   // Викликаємо після завантаження компонента для завантаження країн і Google Maps API
  useEffect(() => {
    const fetchGoogleMapsKey = async () => {
      try {
          const token = localStorage.getItem('access_token'); // Отримайте токен з localStorage
          const response = await axios.get('http://localhost:8000/api/google-maps-key/',{
            headers: {
              'Authorization': `Bearer ${token}` // Додаємо заголовок авторизації
            }
          });
          setApiKey(response.data.google_maps_api_key);
          
          // Використовуйте ключ для ініціалізації Google Maps або інших запитів
        } catch (error) {
          console.error('Помилка при отриманні ключа Google Maps:', error);
        }
      };
    // Завантажуємо Google Maps API скрипт
    const loadGoogleMapsScript = (apiKey) => {
      if (!window.google && apiKey) {
          
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&async=1&defer=1`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onerror = () => {
          console.error('Google Maps API завантаження з помилкою');
        };
        script.onload = () => {
          console.log('Google Maps API завантажений');
                // Тепер ви можете використовувати Google Maps API
        };
      }    
    };
    // Викликаємо функцію для отримання ключа та завантаження скрипта
    const initializeGoogleMaps = async () => {
      await fetchGoogleMapsKey();
      loadGoogleMapsScript(apiKey);
    };
    initializeGoogleMaps();
  }, [apiKey]); // Викликається при кожній зміні API ключаx
    
  useEffect(() => {  
     // Завантажуємо список країн з бекенду
     const fetchCountries = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/countries/', {
        headers: {
          'Authorization': `Bearer ${token}` // Додаємо заголовок авторизації
        }
      });
      
    setCountries(response.data); // Оновлюємо список країн
        // Якщо є хоча б одна країна, автоматично викликаємо fetchRegions для першої країни
      if (response.data.length > 0) {
          const firstCountryId = response.data[0].id;
          const type = 'pickupAddresses'; // Використайте потрібний тип адреси, для якої ви хочете автоматично завантажувати області
          const index = 0; // Використовуємо перший елемент у масиві адрес

            // Викликаємо функцію для отримання областей для першої країни
          fetchRegions(firstCountryId, index, type);
        }
        
      } catch(error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries(); // Завантажуємо список кра��н з бекенду
  }, [apiKey]); // Виконується один раз після завантаження компонента

    // Fetch regions when a country is selected
    const fetchRegions = (countryId, index, type) => {
        const token = localStorage.getItem('access_token'); // Отримуємо токен
        console.log(`Запит на отримання регіонів для країни з ID: ${countryId}`);
        if (countryId) {
          axios.get(`http://localhost:8000/api/regions/${countryId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
                // Логування отриманої відповіді
                console.log(`Отримана відповідь для регіонів країни з ID: ${countryId}`, response.data);
                
                // const updatedAddresses = [...passengerData[type]]; // Копіюємо поточні адреси
                // updatedAddresses[index].regions = response.data; // Оновлюємо регіони для вибраної адреси
                // updatedAddresses[index].isRegionEnabled = true; // Доступ до регіонів відкрито
                setPassengerData(prevState => {
                    const updatedAddresses = [...prevState[type]]; // Копіюємо масив адрес
                    
                    // Оновлюємо дані для конкретної адреси
                    updatedAddresses[index] = {
                      ...updatedAddresses[index],
                      regions: response.data, // Додаємо регіони
                      isRegionEnabled: true // Вмикаємо поле регіонів
                    };
                    // Лог для перевірки оновлення стану
                console.log(`Оновлені адреси для ${type}:`, updatedAddresses);
                    // Оновлюємо стан
                    return {
                        ...prevState,
                        [type]: updatedAddresses // Оновлюємо стан для відповідного типу адрес
                    };
                });
            })
            .catch(error => {
              console.error('Error fetching regions:', error);
            });
        }
      };
    
      // Fetch districts when a region is selected
      const fetchDistricts = (regionId, index, type) => {
        const token = localStorage.getItem('access_token');
        if (regionId) {
          axios.get(`http://localhost:8000/api/districts/${regionId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
                const updatedAddresses = [...passengerData[type]]; // Копіюємо поточні адреси
                updatedAddresses[index].districts = response.data; // Оновлюємо райони для вибраної адреси
                updatedAddresses[index].isDistrictEnabled = true; // Доступ до районів відкрито
                updatedAddresses[index].isCityEnabled = true; // Доступ до міст відкрито
                setPassengerData({ ...passengerData, [type]: updatedAddresses }); // Оновлюємо стан
            })
            .catch(error => {
              console.error('Error fetching districts:', error);
            });
        }
      };


    
      // handleChange для кожної адреси
      const handleChange = (e, index, type, field) => {
        const { name, value } = e.target;
        // Якщо поле є простим (не масивом адрес)
        if (['firstName', 'lastName', 'department', 'phoneNumber', 'email'].includes(name)) {
            setPassengerData((prevData) => ({
                ...prevData,
                [name]: value // Оновлюємо значення для простих полів
            }));
            return;
         }
        // Переконуємося, що тип існує в passengerData і це масив
        if (!Array.isArray(passengerData[type])) {
            console.error(`Type ${type} is not an array in passengerData`);
            return;
        }
        const newAddresses = [...passengerData[type]]; // Копіюємо поточні адреси
        // Переконуємося, що індекс існує в масиві
        if (index < 0 || index >= newAddresses.length) {
            console.error(`Invalid index ${index} for addresses of type ${type}`);
            return;
        }
        newAddresses[index][field] = value; // Оновлюємо значення поля для конкретної адреси
        if (field === 'country') {
            fetchRegions(value, index, type);
          } else if (field === 'region') {
            fetchDistricts(value, index, type); // Викликаємо функцію для отримання районів
          }
        
          // Оновлюємо стан без використання newAddress
        setPassengerData((prevData) => ({
            ...prevData,
            [type]: newAddresses, // Оновлюємо лише конкретний масив адрес
        }));
      };
      
      // Додаємо нову адресу
      const handleAddAddress = (type, e) => {
        e.preventDefault();
        const newAddress = {
          country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: type,
          isRegionEnabled: false, isDistrictEnabled: false, isCityEnabled: false, regions: [], districts: []
        };
      
        setPassengerData((prevData) => ({
          ...prevData,
          [type]: Array.isArray(prevData[type]) ? [...prevData[type], newAddress] : [newAddress], // Перевірка, чи є prevData[type] масивом
        }));
        
      };
      
      // Видаляємо адресу
      const handleRemoveAddress = (index, type, e) => {
        e.preventDefault();
        const newAddresses = [...passengerData[type]];
        newAddresses.splice(index, 1);
        setPassengerData({ ...passengerData, [type]: newAddresses });
      };
      
      // Очищуємо всі поля форми
      const handleClear = () => {
        setPassengerData({
         
          pickupAddresses: [{ 
            country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'pickup',
            isRegionEnabled: true, isDistrictEnabled: false, isCityEnabled: false, regions: [], districts: []
          }],
          dropoffAddresses: [{ 
            country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'dropoff',
            isRegionEnabled: false, isDistrictEnabled: false, isCityEnabled: false, regions: [], districts: []
          }],
          workAddresses: [{ 
            country: '', region: '', city: '', district: '', street: '', house_number: '', latitude: '', longitude: '', point_type: 'work',
            isRegionEnabled: false, isDistrictEnabled: false, isCityEnabled: false, regions: [], districts: []
          }],
          
        });
      };
   // Перевірка заповненості полів адреси
  const validateAddress = (addresses) => {
    return Array.isArray(addresses) && addresses.every(address => address.street && address.house_number && address.city && address.latitude && address.longitude);
  };
  // Відправка даних для створення точок координат
  const checkHasPickupAddress = async () => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await axios.get(`http://localhost:8000/api/passengers/${passengerId}/has-pickup-address/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.hasPickupAddress;
    } catch (error) {
        console.error("Error checking pickup address:", error);
        return false; // Якщо сталася помилка, повертаємо false
    }
  };

  const saveCoordinatePoints = async (addresses, type) => {
    if (!addresses || addresses.length === 0) {
      return [];
    }
  
    const hasPickupAddress = await checkHasPickupAddress();
  
    if (!hasPickupAddress && type !== 'pickup') {
      alert("Спершу додайте хоча б одну адресу для посадки (pickup).");
      return [];
    }
  
    const createdById = localStorage.getItem('user_id');
    const ownerType = 'passenger';
    const ownerId = passengerId;
  
    const formattedAddresses = addresses.map(address => {
      const { country, region, city, district, street, house_number, latitude, longitude, point_type } = address;
      return {
        country,
        region,
        city,
        district,
        street,
        house_number,
        latitude,
        longitude,
        point_type,
        owner_type: ownerType,
        owner_id: ownerId,
        created_by_id: createdById,
      };
    });
  
    const dataToSend = {
      address: formattedAddresses[0] // Надсилаємо першу адресу
    };
  
    console.log("Data being sent to the backend for coordinates:", dataToSend);
  
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/coordinate/create/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Response from server:", response.data);
  
      // Перевіряємо, чи відповідь є масивом
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      // Уникнення багаторазового alert, використовуємо console.error для виводу помилки
      console.error('Помилка при збереженні точок координат:', error.response?.data || error.message);
      // Перевіряємо, чи є повідомлення у відповіді сервера
      if (error.response && error.response.data) {
        console.error('Помилка збереження даних на сервері:', error.response.data);
      } else {
        alert('Помилка при збереженні точок координат. Будь ласка, перевірте правильність даних.');
      }
      return []; // Повертаємо порожній масив замість винятку
    }
  };
  
  const handleSaveAndClose = async () => {
    try {
      await saveCoordinatePoints(passengerData.pickupAddresses, 'pickup');
      await saveCoordinatePoints(passengerData.dropoffAddresses, 'dropoff');
      await saveCoordinatePoints(passengerData.workAddresses, 'work');
  
      alert(t('Update saved successfully!'));
      navigate(-1); // Повернення на попередню сторінку
    } catch (error) {
      console.error('Помилка при збереженні даних:', error);
      alert(t('Error saving data.'));
    }
  };
  
  
      const roundToSixDecimals = (num) => {
          return Math.round(num * 1000000) / 1000000;
      };
      
      // Обробка відправки форми
      const handleSubmit = async () => {
        try {
          // Збереження точок координат і отримання їхніх ID
          const pickupIds = await saveCoordinatePoints(passengerData.pickupAddresses);
          const dropoffIds = await saveCoordinatePoints(passengerData.dropoffAddresses);
          const workIds = await saveCoordinatePoints(passengerData.workAddresses);
      
          const coordinateIds = {
            pickup: pickupIds,
            dropoff: dropoffIds,
            work: workIds,
          };
      
        } catch (error) {
          console.error('Помилка при обробці форми:', error);
        }
      };
      


  // Оновлений обробник для кнопки "Зберегти і продовжити"
  const handleSaveAndContinue = async () => {
    try {
      const pickupIds = await saveCoordinatePoints(passengerData.pickupAddresses);
      const dropoffIds = await saveCoordinatePoints(passengerData.dropoffAddresses);
      const workIds = await saveCoordinatePoints(passengerData.workAddresses);

      alert(t('Addresses saved successfully!')); // Повідомлення про успіх
    } catch (error) {
      console.error('Помилка при збереженні даних:', error);
      alert(t('Error saving data.'));
    }
  };
    
      const handleTableRedirect = () => {
        navigate('/passangers-tableview');  // Перенаправлення на таблицю пасажирів
      };
      // Повернення на попередню сторінку
      const handleClose = () => {
        navigate(-1);
      };
      const verifyAddress = async (address, index, type) => {
        
        const apiKey = 'AIzaSyCEryINvh8xazxGl6X_FXix5aUP17-9gsI'; // Ваш API-ключ Google
        const fullAddress = `${address.street} ${address.house_number}, ${address.city}, ${address.region}, ${address.country}`;
        const languageCode = i18n.language;  // Отримуємо поточну мову з i18n

        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              address: fullAddress,
              key: apiKey,
              language: languageCode // Додаємо параметр для вибору мови
            }
          });
      
          const data = response.data;
          if (data.status === 'OK'&& data.results.length > 0) {
            const result = data.results[0];
            const location = result.geometry.location; // Отримуємо координати
      
            // Оновлюємо адресу з отриманими даними
            setPassengerData(prevState => {
              const updatedAddresses = [...prevState[type]];
              updatedAddresses[index] = {
                ...updatedAddresses[index],
                latitude: location.lat,  // Оновлюємо широту
                longitude: location.lng, // Оновлюємо довготу
                city: result.address_components.find(comp => comp.types.includes('locality'))?.long_name || updatedAddresses[index].city,
                street: result.address_components.find(comp => comp.types.includes('route'))?.long_name || updatedAddresses[index].street,
                house_number: result.address_components.find(comp => comp.types.includes('street_number'))?.long_name || updatedAddresses[index].house_number,
              };
              return {
                ...prevState,
                [type]: updatedAddresses
              };
            });
      
            console.log("Адреса перевірена успішно!");
          } else {
            alert('Адреса не знайдена. Перевірте правильність введених даних.');
          }
        } catch (error) {
          console.error('Помилка при перевірці адреси:', error);
          alert('Помилка при перевірці адреси. Спробуйте ще раз.');
        }
      };
      
  
  return (
    <div className="passenger-table-view">
      <div className="ptw-header">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleClose}>{t('back')}</button>
          
        </div>
      </div>

      <div className="passenger-table-content" style={{ height: 1000 }}>
        <div className="passenger-left-column">
            <button onClick={handleClose} className="ptv-add-passenger-button" style={{ display: 'block' }}>{t('close')}</button>
            <button onClick={handleClear} className="ptv-add-passenger-button" style={{ display: 'block' }}>{t('clear')}</button>
                      <button onClick={handleSaveAndClose} className="ptv-add-passenger-button">{t('save_and_close')}</button>
          
        </div>

        <div className="passenger-right-column">
       
        <h3>ID: {passengerId} | {firstName} {lastName} | {phoneNumber} | {email}</h3>
          <h4> {t('mandatory_fields_message_address')} </h4>

          <div className="form-body">
             {/* Поля для введення даних */}
            
            
            {/* Поля для додавання кількох адрес посадки */}
            <h3>{t('pickup_point')}</h3>
            {passengerData.pickupAddresses.map((pickupAddress, index) => (
            <div key={index} className="address-group">
                <form onSubmit={handleSubmit}>
                <div className="address-row">
                    <label>
                        
                    <select
                        value={pickupAddress.country} // Значення для конкретної адреси
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'country')} // Оновлюємо лише для цієї адреси
                        disabled={countries.length === 0}
                        >
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                            {country.name}
                            </option>
                        ))}
                        </select>

                    </label>
                
                    <label>
                      <select
                        value={pickupAddress.region} // Значення для конкретної адреси
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'region')} // Оновлюємо лише для цієї адреси
                        disabled={!pickupAddress.isRegionEnabled}
                      >
                        <option value="">{t('region')}</option>
                        {Array.isArray(pickupAddress.regions) && pickupAddress.regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <select
                        value={pickupAddress.district} // Значення для конкретної адреси
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'district')} // Оновлюємо лише для цієї адреси
                        disabled={!pickupAddress.isDistrictEnabled}
                      >
                        <option value="">{t('district')}</option>
                        {Array.isArray(pickupAddress.districts) && pickupAddress.districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    
                </div>
                
                <div className="address-row">
                    <label>
                        
                        <input
                        type="text"
                        name={`pickupAddress_city_${index}`}
                        disabled={!pickupAddress.isCityEnabled}
                        placeholder={t('city')}
                        value={pickupAddress.city}
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'city')}
                        />
                        
                    </label>

                    <label>
                        <input
                        type="text"
                        name={`pickupAddress_street_${index}`}
                        disabled={!pickupAddress.isCityEnabled}
                        placeholder={t('street')}
                        value={pickupAddress.street}
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'street')}
                        />
                        
                    </label>
                
                    <label>
                    <input
                        type="text"
                        name={`pickupAddress_house_number_${index}`}
                        disabled={!pickupAddress.isCityEnabled}
                        placeholder={t('house_number')}
                        value={pickupAddress.house_number}
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'house_number')}
                    />   
                    <button 
                    type="button"
                    onClick={() => verifyAddress(pickupAddress, index, 'pickupAddresses', i18n.language)} 
                    className="small-button"
                    >
                    {t('verify_address')}
                    </button>


                    </label>
                    </div>
                    
                    <div>
                    <label>
                    <input
                        type="text"
                        name={`pickupAddress_latitude_${index}`}
                        disabled={!pickupAddress.isCityEnabled}
                        placeholder={t('latitude')}
                        value={pickupAddress.latitude}
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'latitude')}
                     />
                        
                    </label>
                    <label>
                    <input
                        type="text"
                        name={`pickupAddress_longitude_${index}`}
                        disabled={!pickupAddress.isCityEnabled}
                        placeholder={t('longitude')}
                        value={pickupAddress.longitude}
                        onChange={(e) => handleChange(e, index, 'pickupAddresses', 'longitude')}
                        />
                        
                    </label>
                    
                    <button onClick={(e) => handleAddAddress('pickupAddresses', e)} className="small-button">{t('add_address')}</button>
                   

                    {passengerData.pickupAddresses.length > 1 && (
                    <button onClick={(e) => handleRemoveAddress(index, 'pickupAddresses', e)} className="small-button remove-button">
                        {t('remove_address')}
                    </button>
                    )}

                    
                    </div>
                    
                </form>
            
            </div>
            ))}

            {/* Поля для додавання кількох адрес висадки */}
            <h3>{t('dropoff_point')}</h3>
            {passengerData.dropoffAddresses.map((dropoffAddress, index) => (
                <div key={index} className="address-group">
                    <form onSubmit={handleSubmit}>
                        <div className="address-row">
                            <label>
                            <select
                                value={dropoffAddress.country} // Значення для конкретної адреси висадки
                                onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'country')} // Оновлюємо лише для цієї адреси висадки
                                disabled={countries.length === 0}
                                >
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                    {country.name}
                                    </option>
                                ))}
                                </select>
                            </label>
                            <label>
                              <select
                                value={dropoffAddress.region} // Значення для конкретної адреси висадки
                                onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'region')} // Оновлюємо лише для цієї адреси висадки
                                disabled={!dropoffAddress.isRegionEnabled}
                              >
                                <option value="">{t('region')}</option>
                                {Array.isArray(dropoffAddress.regions) && dropoffAddress.regions.map((region) => (
                                  <option key={region.id} value={region.id}>
                                    {region.name}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label>
                              <select
                                value={dropoffAddress.district} // Значення для конкретної адреси висадки
                                onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'district')} // Оновлюємо лише для цієї адреси висадки
                                disabled={!dropoffAddress.isDistrictEnabled}
                              >
                                <option value="">{t('district')}</option>
                                {Array.isArray(dropoffAddress.districts) && dropoffAddress.districts.map((district) => (
                                  <option key={district.id} value={district.id}>
                                    {district.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                        </div>
                        <div className="address-row">
                            <label>
                                <input
                                    type="text"
                                    name={`dropoffAddress_city_${index}`}
                                    disabled={!dropoffAddress.isCityEnabled}
                                    placeholder={t('city')}
                                    value={dropoffAddress.city}
                                    onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'city')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`dropoffAddress_street_${index}`}
                                    disabled={!dropoffAddress.isCityEnabled}
                                    placeholder={t('street')}
                                    value={dropoffAddress.street}
                                    onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'street')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`dropoffAddress_house_number_${index}`}
                                    disabled={!dropoffAddress.isCityEnabled}
                                    placeholder={t('house_number')}
                                    value={dropoffAddress.house_number}
                                    onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'house_number')}
                                />
                            </label>
                            <button 
                            type="button"
                            onClick={() => verifyAddress(dropoffAddress, index, 'dropoffAddresses',i18n.language)} 
                            className="small-button"
                            >
                            {t('verify_address')}
                            </button>                           
                        </div>
                            <div>
                            <label>
                                <input
                                    type="text"
                                    name={`dropoffAddress_latitude_${index}`}
                                    disabled={!dropoffAddress.isCityEnabled}
                                    placeholder={t('latitude')}
                                    value={dropoffAddress.latitude}
                                    onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'latitude')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`dropoffAddress_longitude_${index}`}
                                    disabled={!dropoffAddress.isCityEnabled}
                                    placeholder={t('longitude')}
                                    value={dropoffAddress.longitude}
                                    onChange={(e) => handleChange(e, index, 'dropoffAddresses', 'longitude')}
                                />
                            </label>
                            <button onClick={(e) => handleAddAddress('dropoffAddresses', e)} className="small-button">
                            {t('add_address')}
                            </button>

                            {passengerData.dropoffAddresses.length > 1 && (
                            <button onClick={(e) => handleRemoveAddress(index, 'dropoffAddresses', e)} className="small-button remove-button">
                                {t('remove_address')}
                            </button>
                            )}
                        
                            </div>
                        
                    </form>
                </div>
            ))}

            {/* Поля для додавання кількох адрес роботи */}
            <h3>{t('work_point')}</h3>
            {passengerData.workAddresses.map((workAddress, index) => (
                <div key={index} className="address-group">
                    <form onSubmit={handleSubmit}>
                        <div className="address-row">
                            <label>
                            <select
                                value={workAddress.country} // Значення для конкретної робочої адреси
                                onChange={(e) => handleChange(e, index, 'workAddresses', 'country')} // Оновлюємо лише для цієї робочої адреси
                                disabled={countries.length === 0}
                                >
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                    {country.name}
                                    </option>
                                ))}
                                </select>
                            </label>
                            <label>
                              <select
                                value={workAddress.region} // Значення для робочої адреси
                                onChange={(e) => handleChange(e, index, 'workAddresses', 'region')} // Оновлюємо лише для цієї робочої адреси
                                disabled={!workAddress.isRegionEnabled}
                              >
                                <option value="">{t('region')}</option>
                                {Array.isArray(workAddress.regions) && workAddress.regions.map((region) => (
                                  <option key={region.id} value={region.id}>
                                    {region.name}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label>
                              <select
                                value={workAddress.district} // Значення для робочої адреси
                                onChange={(e) => handleChange(e, index, 'workAddresses', 'district')} // Оновлюємо лише для цієї робочої адреси
                                disabled={!workAddress.isDistrictEnabled}
                              >
                                <option value="">{t('district')}</option>
                                {Array.isArray(workAddress.districts) && workAddress.districts.map((district) => (
                                  <option key={district.id} value={district.id}>
                                    {district.name}
                                  </option>
                                ))}
                              </select>
                            </label>

                        </div>
                        <div className="address-row">
                            <label>
                                <input
                                    type="text"
                                    name={`workAddress_city_${index}`}
                                    disabled={!workAddress.isCityEnabled}
                                    placeholder={t('city')}
                                    value={workAddress.city}
                                    onChange={(e) => handleChange(e, index, 'workAddresses', 'city')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`workAddress_street_${index}`}
                                    disabled={!workAddress.isCityEnabled}
                                    placeholder={t('street')}
                                    value={workAddress.street}
                                    onChange={(e) => handleChange(e, index, 'workAddresses', 'street')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`workAddress_house_number_${index}`}
                                    disabled={!workAddress.isCityEnabled}
                                    placeholder={t('house_number')}
                                    value={workAddress.house_number}
                                    onChange={(e) => handleChange(e, index, 'workAddresses', 'house_number')}
                                />
                            </label>
                        
                            <button 
                            type="button"
                            onClick={() => verifyAddress(workAddress, index, 'workAddresses', i18n.language)} 
                            className="small-button"
                            >
                            {t('verify_address')}
                            </button>

                         </div>   
                            <label>
                                <input
                                    type="text"
                                    name={`workAddress_latitude_${index}`}
                                    disabled={!workAddress.isCityEnabled}
                                    placeholder={t('latitude')}
                                    value={workAddress.latitude}
                                    onChange={(e) => handleChange(e, index, 'workAddresses', 'latitude')}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name={`workAddress_longitude_${index}`}
                                    disabled={!workAddress.isCityEnabled}
                                    placeholder={t('longitude')}
                                    value={workAddress.longitude}
                                    onChange={(e) => handleChange(e, index, 'workAddresses', 'longitude')}
                                />
                            </label>
                            
                            <button onClick={(e) => handleAddAddress('workAddresses', e)} className="small-button">
                            {t('add_address')}
                            </button>

                            {passengerData.workAddresses.length > 1 && (
                            <button onClick={(e) => handleRemoveAddress(index, 'workAddresses', e)} className="small-button remove-button">
                                {t('remove_address')}
                            </button>
                            )}
                        
                    </form>
                </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEditPassengerForm;
