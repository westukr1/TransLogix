import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const EditPassenger = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Отримуємо дані пасажира з `location.state`
  const passengerDataFromState = location.state?.passengerData || {};

  const [passengerData, setPassengerData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    phoneNumber: '',
    email: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  // Ініціалізація даних пасажира у стані
  useEffect(() => {
    if (passengerDataFromState) {
      setPassengerData({
        id: passengerDataFromState.id || '',
        firstName: passengerDataFromState.first_name || '',
        lastName: passengerDataFromState.last_name || '',
        department: passengerDataFromState.department || '',
        phoneNumber: passengerDataFromState.phone_number || '',
        email: passengerDataFromState.email || '',
      });
      console.log("Дані пасажира, отримані з location.state:", passengerDataFromState);
    }
  }, [passengerDataFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndClose = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      // Формування даних для оновлення
      const dataToUpdate = {
        department: passengerData.department,
        phone_number: passengerData.phoneNumber,
        email: passengerData.email,
      };
      
      console.log("Дані для відправки на оновлення:", dataToUpdate);
  
      // Відправлення запиту PUT
      const response = await axios.put(`http://localhost:8000/api/passengers/${passengerData.id}/update/`, dataToUpdate, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 204) { 
        alert(t('Passenger saved successfully!'));
        navigate(-1); // Повернення на попередню сторінку після успішного збереження
      } else {
        console.warn("Відповідь сервера не успішна:", response);
        alert(t('Помилка при збереженні пасажира.'));
      }
  
    } catch (error) {
      console.error('Error saving passenger:', error);
      alert(t('Помилка при збереженні пасажира. Перевірте правильність введених даних.'));
    }
  };
  

  const handleRedirectToAddresses = () => {
    const passengerId = passengerData.id// отримати id пасажира, який редагується
    console.log('Passenger ID:', passengerId); // Лог для перевірки
    navigate('/edit-passenger-addresses', { state: { passengerId } }); // Перехід на екран редагування адрес
  };

  const handleClose = () => {
    navigate(-1);
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
          <button onClick={handleClose} className="ptv-add-passenger-button">{t('close')}</button>
          <button onClick={handleSaveAndClose} className="ptv-add-passenger-button">{t('save_and_close')}</button>
          <button onClick={handleRedirectToAddresses} className="ptv-add-passenger-button">{t('edit_passenger_addresses')}</button>
        </div>

        <div className="passenger-right-column">
          

          <div className="form-body">
            {/* Поле для ID пасажира */}
            <input
              type="text"
              name="id"
              placeholder={t('id')}
              value={passengerData.id}
              disabled={true} // ID не редагується
            />
            {/* Поле для імені (не редаговане) */}
            <input
              type="text"
              name="firstName"
              placeholder={t('first_name')}
              value={passengerData.firstName}
              onChange={handleChange}
              disabled={true}
            />
            {/* Поле для прізвища (не редаговане) */}
            <input
              type="text"
              name="lastName"
              placeholder={t('last_name')}
              value={passengerData.lastName}
              onChange={handleChange}
              disabled={true}
            />
            {/* Редаговані поля */}
            <input
              type="text"
              name="department"
              placeholder={t('department')}
              value={passengerData.department}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder={t('phone_number')}
              value={passengerData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={passengerData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassenger;
