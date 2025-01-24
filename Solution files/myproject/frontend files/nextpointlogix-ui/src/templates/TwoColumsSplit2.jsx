import React, { useState, useEffect } from "react";
import "./TwoColumnsSplit2.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import dayjs from "dayjs";

const TwoColumnsSplit2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчуванням "en"

  return (
    <div className="tcs2-two-column-template">
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
      <div className="tcs2-template2s-content">
        {/* Left Column */}
        <div className="urs-template2s-left-column">
          <p>{t("left_column_content")}</p>
        </div>
        {/* Right Column */}
        <div className="tcs2-template2s-right-column">
          <div className="urs-template2s-upper-right">
            <p>{t("right_upper_content")}</p>
          </div>
          <div className="tcs2-template2s-lower-right">
            <p>{t("right_lower_content")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnsSplit2;
