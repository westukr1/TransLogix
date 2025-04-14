import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";

const NewEditPassengerForm = ({ onClose, onSave }) => {
  const { t } = useTranslation(); // Підключаємо переклад
  const navigate = useNavigate();

  // Стани для зберігання даних про пасажира
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    phoneNumber: '',
    email: '',
  });

  const [passengerId, setPassengerId] = useState(null); // Стан для зберігання ID пасажира
  const [isDisabled, setIsDisabled] = useState(false); // Стан для блокування полів
  const [isPassengerCreated, setIsPassengerCreated] = useState(false); // Прапорець для перевірки, чи створено пасажира

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerData((prevData) => ({
      ...prevData,
      [name]: value, // Оновлюємо значення для полів
    }));
  };

  // Очищуємо всі поля форми і робимо їх доступними для введення нового пасажира
  const handleClear = () => {
    setPassengerData({
      firstName: '',
      lastName: '',
      department: '',
      phoneNumber: '',
      email: '',
    });
    setPassengerId(null); // Очищаємо поле ID
    setIsDisabled(false); // Робимо поля активними
    setIsPassengerCreated(false); // Скидаємо прапорець після очищення форми
  };

  // Функція для відправки даних на бекенд у потрібному форматі
  const savePassengerData = async () => {
    if (isPassengerCreated) {
      alert('Цей пасажир вже створений.');
      return false;
    }
  
    const dataToSend = {
      first_name: passengerData.firstName,
      last_name: passengerData.lastName,
      department: passengerData.department,
      phone_number: passengerData.phoneNumber,
      email: passengerData.email,
      pickup_addresses: [],
      dropoff_addresses: [],
      work_addresses: [],
    };
  
    try {
      const response = await axios.post(API_ENDPOINTS.createPassenger, dataToSend);
      console.log('Response data:', response.data);
  
      if (response.status === 200 || response.status === 201) {
        setIsPassengerCreated(true);
        setPassengerId(response.data.id);
        return true;
      }
    } catch (error) {
      console.error('Помилка при збереженні даних:', error);
      return false;
    }
  };
  

  // Обробка кнопки "Зберегти і закрити"
  const handleSaveAndClose = async () => {
    const isSaved = await savePassengerData();
    if (isSaved) {
      alert('Passenger saved successfully!');
      
      navigate(-1); // Повернення на попередню сторінку
    } else {
      alert('Помилка при збереженні пасажира.');
    }
  };

  // Обробка кнопки "Зберегти і продовжити"
  const handleSaveAndContinue = async () => {
    const isSaved = await savePassengerData();
    if (isSaved) {
      alert('Passenger saved successfully!');
      setIsDisabled(true); // Робимо всі поля неактивними
    } else {
      alert('Помилка при збереженні пасажира.');
    }
  };

  const handleTableRedirect = () => {
    navigate('/passangers-tableview');  // Перенаправлення на таблицю пасажирів
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleRedirectToAddresses = () => {
    navigate('/add-passenger', { state: { passengerId, ...passengerData } });
     // Шлях, який веде до форми NewEditPassengerForm
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
          <button onClick={handleSaveAndContinue} className="ptv-add-passenger-button">{t('save_and_continue')}</button>
          <button onClick={handleRedirectToAddresses} className="ptv-add-passenger-button" style={{ display: 'block' }}disabled={!passengerId}>{t('address_view')}</button>
          <button onClick={handleTableRedirect} className="ptv-add-passenger-button" style={{ display: 'block' }}>{t('table_view')}</button>
          
        </div>

        <div className="passenger-right-column">
          <h4>{t('mandatory_fields_message')}</h4>

          <div className="form-body">
            <input
              type="text"
              name="firstName"
              placeholder={t('first_name')}
              value={passengerData.firstName}
              onChange={handleChange}
              disabled={isDisabled} // Поле стає неактивним після збереження
            />
            <input
              type="text"
              name="lastName"
              placeholder={t('last_name')}
              value={passengerData.lastName}
              onChange={handleChange}
              disabled={isDisabled} // Поле стає неактивним після збереження
            />
            <input
              type="text"
              name="department"
              placeholder={t('department')}
              value={passengerData.department}
              onChange={handleChange}
              disabled={isDisabled} // Поле стає неактивним після збереження
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder={t('phone_number')}
              value={passengerData.phoneNumber}
              onChange={handleChange}
              disabled={isDisabled} // Поле стає неактивним після збереження
            />
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={passengerData.email}
              onChange={handleChange}
              disabled={isDisabled} // Поле стає неактивним після збереження
            />
            {/* Поле для ID, якщо воно є */}
            {passengerId && (
              <input
                type="text"
                name="passengerId"
                placeholder={t('id')}
                value={passengerId}
                disabled={true} // Поле для ID неактивне для редагування
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEditPassengerForm;
