// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AppSelectionPage.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const AppSelectionPage = () => {
  const [allowedApps, setAllowedApps] = useState({
    operator_ui: false,
    finance_manager: false,
    admin: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Отримуємо токен з localStorage
    console.log(token);

    // Перевіряємо, чи є токен, і робимо запит на отримання дозволених додатків
    if (token) {
      fetch("http://localhost:8000/api/allowed-apps/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Додаємо токен до заголовка запиту
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Access denied or invalid token");
          }
          return response.json(); // Перетворення на JSON
        })
        .then((data) => {
          console.log("Отримані дозволи на додатки:", data); // Лог для перевірки отриманих даних
          setAllowedApps(data); // Оновлення стану дозволів
        })
        .catch((error) => {
          console.error("Помилка отримання дозволів:", error); // Лог для помилки
        });
    } else {
      console.error("Токен не знайдено. Будь ласка, увійдіть у систему.");
    }
  }, []);

  const navigate = useNavigate();
  const { t } = useTranslation(); // Підключаємо переклад

  const handleNavigation = (path) => {
    if (path === "/operator-ui") {
      const selectedLanguage = localStorage.getItem("language"); // Отримуємо мову
      const accessToken = localStorage.getItem("access_token"); // Отримуємо токен
      // Передаємо мову та токен через URL
      window.location.href = `http://localhost:3003?lang=${selectedLanguage}&access_token=${accessToken}`;
    } else {
      navigate(path);
    }
  };
  // eslint-disable-next-line
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Зміна мови у вашому додатку
    localStorage.setItem("language", language); // Збереження вибору мови в localStorage
  };

  return (
    <div className="asp-app-selection-page">
      <div
        className="app-left-column"
        style={{ backgroundImage: "url('/Background.png')" }}
      >
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="asp-right-column">
        <div className="asp-buttons-container">
          <button
            className={`asp-auth-button ${
              allowedApps.operator_ui ? "enabled" : "disabled"
            }`}
            onClick={() =>
              allowedApps.operator_ui && handleNavigation("/operator-ui")
            }
            disabled={!allowedApps.operator_ui}
          >
            {t("logistic_operator")}
          </button>

          <button
            className={`asp-auth-button ${
              allowedApps.finance_manager ? "enabled" : "disabled"
            }`}
            onClick={() =>
              allowedApps.finance_manager &&
              handleNavigation("/finance-manager")
            }
            disabled={!allowedApps.finance_manager}
          >
            {t("finance_manager")}
          </button>

          <button
            className={`asp-auth-button ${
              allowedApps.admin ? "enabled" : "disabled"
            }`}
            onClick={() => allowedApps.admin && handleNavigation("/admin")}
            disabled={!allowedApps.admin}
          >
            {t("administrator")}
          </button>
          <div className="greeting-container">
            <h2></h2>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <button
            className="asp-auth-button"
            onClick={() => navigate("/reset-password")}
          >
            {t("reset_password")}
          </button>
          <button
            className="asp-auth-button"
            onClick={() => handleNavigation("/")}
          >
            {t("back_to_login")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSelectionPage;
