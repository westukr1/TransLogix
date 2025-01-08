// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppSelectionPage.css'; // Використовуємо стилі з AppSelectionPage
import { useTranslation } from 'react-i18next';

const NewUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  // eslint-disable-next-line
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Стан для контролю спливаючого вікна
  // eslint-disable-next-line
  const { t } = useTranslation();  // Додаємо useTranslation для доступу до t

  const navigate = useNavigate();

  // Функція для перевірки валідності email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Функція для перевірки якості пароля
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // Пароль повинен бути мінімум 8 символів, містити як мінімум одну цифру та одну велику літеру
    return passwordRegex.test(password);
  };

  const handleBackToAdmin = () => {
    navigate('/admin');
  };
// Функція для заповнення тестовими даними
const fillTestData = () => {
  setUsername('testuser');
  setEmail('testuser@example.com');
  setPassword('Test1234');
  setConfirmPassword('Test1234');
  setFullName('John Doe');
  // setPhoneNumber('123-456-7890');
};
  const handleSubmit = async () => {
    // Очищаємо попередні помилки
    setErrorMessage('');

    // Перевіряємо, чи всі поля заповнені
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !fullName.trim()
     
    ) {
      setErrorMessage('Please fill in all fields');
      setShowAlert(true); // Показуємо спливаюче вікно з повідомленням
      return;
    }

    // Перевірка, чи відповідає email стандарту
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      setShowAlert(true);
      return;
    }

    // Перевірка якості пароля
    if (!validatePassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long, include one uppercase letter and one number'
      );
      setShowAlert(true);
      return;
    }

    // Перевірка, чи співпадають паролі
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setShowAlert(true); // Показуємо спливаюче вікно
      return;
    }

    setShowAlert(false); // Закриваємо спливаюче вікно, якщо всі поля заповнені і паролі співпадають
    console.log('User created successfully');
    
    // Логіка для відправки даних на сервер
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,  // Змінено відповідно до Postman
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPassword  // Додано для відповідності Postman
        }),
      });

      if (response.ok) {
        setErrorMessage('User created successfully!', response);
        setShowAlert(true); // Закриваємо спливаюче вікно
        //console.log('User created successfully');
        // Можна перенаправити користувача або показати повідомлення
      } else {
        const errorData = await response.json();
        if (errorData.username) {
          setErrorMessage('Username already exists. Please choose another one.');
          setShowAlert(true);
        } else {
          setErrorMessage('Failed to create user');
          setShowAlert(true); // Показуємо спливаюче вікно з помилкою
        }
      }
    } catch (error) {
      setErrorMessage('Error occurred while creating user');
      setShowAlert(true); // Показуємо спливаюче вікно з помилкою
    }
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
          <h2>{t('Create_New_Account')}</h2>
          <p style={{ fontSize: '1rem' }}>{t('fill_form_text')}</p>
        </div>
        <div className="new-user-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="auth-input"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
          />
          
        </div>
        <div className="asp-buttons-container">
          <button className="asp-auth-button" onClick={handleBackToAdmin}>
            {t('Back_to_Admin_panel')}
          </button>
          <button
            className="asp-auth-button"
            onClick={handleSubmit}
          >
            {t('create_users_account')}
          </button>
        
          {/* Додаємо кнопку для заповнення тестовими даними */}
          <button className="asp-auth-button" onClick={fillTestData}>
            Fill Test Data
          </button>
        </div>

        {/* Спливаюче вікно з повідомленням */}
        {showAlert && (
          <div className="alert-popup">
            <div className="alert-content">
              <p>{errorMessage}</p>
              <button className="close-alert-button" onClick={closeAlert}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewUser;
