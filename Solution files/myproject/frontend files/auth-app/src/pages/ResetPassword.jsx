// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import './AppSelectionPage.css'; // Підключаємо стиль
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const [username, setUsername] = useState(''); // Юзер тільки для читання
  const [oldPassword, setOldPassword] = useState(''); // Старий пароль
  const [newPassword, setNewPassword] = useState(''); // Новий пароль
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // Підтвердити новий пароль
  const [message, setMessage] = useState(''); // Повідомлення для виводу
  const [showAlert, setShowAlert] = useState(false); // Стан для відображення спливаючого вікна
  const { t } = useTranslation();  // Додаємо useTranslation для доступу до t

  useEffect(() => {
    fetch('http://localhost:8000/api/me/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setUsername(data.username);  // Встановлюємо ім'я користувача
    })
    .catch(error => console.error('Error fetching user info:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/change-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Використайте токен авторизації
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }),
    });
    
    const data = await response.json();
    if (response.ok) {
      setMessage(t('password_updated_successfully'), data);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else if (data.error) {
      setMessage(data.error);
    } else {
      setMessage(t('failed_to_update_password'));
    }
    setShowAlert(true); // Відкриваємо спливаюче вікно
  };

  const closeAlert = () => {
    setShowAlert(false); // Закриваємо спливаюче вікно
  };

  return (
    <div className="asp-app-selection-page">
      <div className="asp-left-column">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="asp-right-column">
        <div className="asp-greeting-container">
          <h2>{t('reset_password')}</h2>
        </div>
        <div className="new-user-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            readOnly
            className="rs-auth-input"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="rs-auth-input"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rs-auth-input"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="rs-auth-input"
            />
            <div>
                <p>{t('password_must_be_info')}</p>
  
            </div>
            <div className="asp-buttons-container">
              <button type="submit" className="asp-auth-button">{t('submit')}</button>
              <button className="asp-auth-button" onClick={() => window.history.back()}>{t('back')}</button>
            </div>
          </form>
        </div>
        {/* Спливаюче вікно з повідомленням */}
        {showAlert && (
          <div className="alert-popup">
            <div className="alert-content">
              <p>{message}</p>
              <button className="close-alert-button" onClick={closeAlert}>
              {t('close')}
              </button>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default ResetPassword;
