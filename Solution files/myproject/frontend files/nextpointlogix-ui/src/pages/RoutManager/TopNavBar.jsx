import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopNavBar.css";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const TOP_NAV_STORAGE_KEY = "routeManager.topNavDateFilters";

const TopNavBar = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return i18n.language || "en";
    }

    const savedLanguage =
      localStorage.getItem("i18nextLng") ||
      localStorage.getItem("language") ||
      i18n.language ||
      "en";
    return savedLanguage;
  });

  const getStoredDateFilters = () => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const storedValue = localStorage.getItem(TOP_NAV_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Failed to parse saved top nav filters", error);
      return null;
    }
  };

  const [startDateTime, setStartDateTime] = useState(() => {
    const storedFilters = getStoredDateFilters();
    if (storedFilters?.startDateTime) {
      return storedFilters.startDateTime;
    }

    const now = new Date();
    return format(now, "yyyy-MM-dd'T'HH:mm");
  });

  const [endDateTime, setEndDateTime] = useState(() => {
    const storedFilters = getStoredDateFilters();
    if (storedFilters?.endDateTime) {
      return storedFilters.endDateTime;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, "yyyy-MM-dd'T'HH:mm");
  });

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem("i18nextLng", language);
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const payload = {
      startDateTime,
      endDateTime,
    };

    try {
      localStorage.setItem(TOP_NAV_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to persist top nav filters", error);
    }
  }, [endDateTime, startDateTime]);

  const handleStartChange = (e) => {
    setStartDateTime(e.target.value);
    const newEndDate = new Date(e.target.value);
    newEndDate.setDate(newEndDate.getDate() + 1);
    setEndDateTime(format(newEndDate, "yyyy-MM-dd'T'HH:mm"));
  };

  const handleEndChange = (e) => {
    setEndDateTime(e.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
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
      <div className="language-selector">
        <label htmlFor="language-select">{t("language", "Language")}</label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">EN</option>
          <option value="uk">UK</option>
        </select>
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
