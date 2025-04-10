import React, { useState, useEffect } from "react";
import "./UserRoutesSettings.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { API_ENDPOINTS } from "../../../config/apiConfig";
import axios from "../../../utils/axiosInstance";
import dayjs from "dayjs";

const UserRoutesSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчуванням "en"
  const [settings, setSettings] = useState({
    date_interval: 1,
    arrival_time_tolerance: 30,
    allow_mixed_directions: false,
    max_route_duration: 240,
    max_route_distance: 100,
    max_stops: 10,
    max_passengers: 50,
    min_passengers: 1,
    allow_multiple_work_addresses: false,
  });

  // Функція для отримання налаштувань
  const fetchSettings = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.getSettings);
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      alert(t("error.fetch_settings"));
    }
  };
  const updateSettings = async () => {
    try {
      await axios.post(API_ENDPOINTS.updateSettings, settings);
      alert(t("settings_updated"));
    } catch (error) {
      console.error("Error updating settings:", error);
      alert(t("error.update_settings"));
    }
  };
  useEffect(() => {
    fetchSettings();
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="urs-two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <h1 className="header-title">{t("user_routes_settings")}</h1>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={() => navigate(-1)}>
            {t("nav.back")}
          </button>
        </div>
      </div>
      <div className="urs-template2s-content">
        {/* Left Column */}
        <div className="urs-template2s-left-column">
          <h2>{t("current_settings")}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSettings();
            }}
          >
            <table className="settings-table">
              <tbody>
                <tr>
                  <td>
                    <label>{t("date_interval")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="date_interval"
                      value={settings.date_interval}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("arrival_time_tolerance")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="arrival_time_tolerance"
                      value={settings.arrival_time_tolerance}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("allow_mixed_directions")}:</label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="allow_mixed_directions"
                      checked={settings.allow_mixed_directions}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("max_route_duration")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="max_route_duration"
                      value={settings.max_route_duration}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("max_route_distance")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="max_route_distance"
                      value={settings.max_route_distance}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("max_stops")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="max_stops"
                      value={settings.max_stops}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("max_passengers")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="max_passengers"
                      value={settings.max_passengers}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("min_passengers")}:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="min_passengers"
                      value={settings.min_passengers}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>{t("allow_multiple_work_addresses")}:</label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="allow_multiple_work_addresses"
                      checked={settings.allow_multiple_work_addresses}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="nav-button">
              {t("save_settings")}
            </button>
          </form>
        </div>
        {/* Right Column */}
        <div className="urs-template2s-right-column">
          <div className="urs-template2s-upper-right">
            <p>{t("right_upper_content")}</p>
          </div>
          <div className="urs-template2s-lower-right">
            <p>{t("right_lower_content")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoutesSettings;
