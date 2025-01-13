import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation(); // Отримуємо функцію для перекладу

  return (
    <header className="header-header">
      <div className="header-logo">
        <img src="/logo.png" alt="NextPointLogix" />
      </div>
      <nav className="header-nav">
        <Link to="/calendar" className="nav-item">
          {t("calendar")}
        </Link>
        <Link to="/notifications" className="nav-item">
          {t("notifications")}
        </Link>

        {/* Кнопка для повернення до додатків */}
        <Link to="http://localhost:3001/app-selection" className="nav-item">
          {t("back_to_apps")}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
