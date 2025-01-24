import React from "react";
import { Link } from "react-router-dom";
import "./TopNavBar.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="top-nav-bar">
      <div className="logo">
        <img src="/logo.png" alt="NextPointLogix" />
      </div>
      <div className="date-time">
        <p>Time: </p>
        <label>Start:</label>
        <input type="datetime-local" />
        <label>End:</label>
        <input type="datetime-local" />
      </div>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">
          Main Screen
        </Link>
        <Link to="/map-of-routes" className="nav-button">
          Routes Map
        </Link>
        <Link to="/calendar" className="nav-button">
          Calendar
        </Link>
        <Link to="/driver-vehicle-management" className="nav-button">
          {t("driver_vehicle_management")}
        </Link>
        <button className="nav-button" onClick={() => window.history.back()}>
          {t("nav.back")}
        </button>
      </div>
    </div>
  );
};

export default TopNavBar;
