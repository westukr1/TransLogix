// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppSelectionPage.css';  // Використовуємо існуючий стиль для AppSelectionPage
import { useTranslation } from 'react-i18next';

function GuestAccess() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/');
  };

  const { t } = useTranslation();  // Додаємо useTranslation для доступу до t

  const handleContinueAsGuest = () => {
    navigate('/app-selection'); // Перенаправляємо на сторінку вибору додатків
  };
  
  return (
    <div className="asp-app-selection-page">
      <div className="asp-left-column">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="asp-right-column">
      <div className="asp-greeting-container">
          <h2>{t('welcome_Guest!')}</h2>
          <p>
          {t('welcome_text')}
          </p>
        </div>  
        <div className="asp-buttons-container">
        <button className="asp-auth-button" onClick={handleBackToLogin}>
        {t('back_to_login')}
        </button>
        <button className="asp-auth-button" onClick={handleContinueAsGuest}>
        {t('continue_as_guest')}
        </button>
        </div>
      </div>
    </div>
  );
};


export default GuestAccess;
