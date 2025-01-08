// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import './AppSelectionPage.css'; // Використовуємо стиль з AppSelectionPage.css
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();  // Додаємо useTranslation для доступу до t

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/forgot-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Тут повинен бути правильний токен
      },
      body: JSON.stringify({
        email_or_username: emailOrUsername,
      }),
    });

    if (response.ok) {
      setMessage(t('email_new_password'));
    } else {
      setMessage(t('failed_send_email'));
    }
  };

  return (
    <div className="asp-app-selection-page">
      <div className="asp-left-column">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="asp-right-column">
        <div className="asp-greeting-container">
          <h2>{t('forgot_password')}</h2>
          <p>{t('reset_password_info')}</p>
          
          <p>
          {t('please_be_careful')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="new-user-form">
          <input
            type="text"
            placeholder="Enter your username or email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="auth-input"
          />
          <div className="asp-buttons-container">
            <button type="submit" className="asp-auth-button">{t('submit')}</button>
            <button className="asp-auth-button" onClick={(e) => { e.preventDefault(); window.history.back(); }}>{t('back')}</button>
          </div>
        </form>
        {message && (
          <div className="alert-popup">
            <div className="alert-content">
              <p>{message}</p>
              <button className="close-alert-button" onClick={() => setMessage('')}>{t('close')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
