import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopNavBar.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const TopNavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startDateTime, setStartDateTime] = useState(() => {
    const now = new Date();
    return format(now, "yyyy-MM-dd'T'HH:mm");
  });

  const [endDateTime, setEndDateTime] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, "yyyy-MM-dd'T'HH:mm");
  });

  const handleStartChange = (e) => {
    setStartDateTime(e.target.value);
    const newEndDate = new Date(e.target.value);
    newEndDate.setDate(newEndDate.getDate() + 1);
    setEndDateTime(format(newEndDate, "yyyy-MM-dd'T'HH:mm"));
  };

  const handleEndChange = (e) => {
    setEndDateTime(e.target.value);
  };
  return (
    <div className="top-nav-bar">
      <div className="logo">
        <img src="/logo.png" alt="NextPointLogix" />
      </div>
      <div className="date-time">
        <p>{t("Time :")}</p>
        <label>{t("from")}</label>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={handleStartChange}
        />
        <label>{t("to")}</label>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={handleEndChange}
        />
      </div>
      <div className="nav-buttons">
        <Link to="/map-of-routes" className="nav-button">
          Routes Map
        </Link>
        <Link to="/calendar" className="nav-button">
          Calendar
        </Link>
        <Link to="/driver-vehicle-management" className="nav-button">
          {t("driver_vehicle_management")}
        </Link>
        <Link to="/" className="nav-button">
          {t("nav.back")}
        </Link>
       
      </div>
    </div>
  );
};

export default TopNavBar;
