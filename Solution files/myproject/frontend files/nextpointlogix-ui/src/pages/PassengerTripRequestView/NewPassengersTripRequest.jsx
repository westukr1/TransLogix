import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const NewPassengersTripRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passenger_first_name: "",
    passenger_last_name: "",
    passenger_phone: "",
    direction: "",
    endpoint_type: "",
    planned_datetime: "",
    pickup_city: "",
    pickup_street: "",
    pickup_house: "",
    dropoff_city: "",
    dropoff_street: "",
    dropoff_house: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/api/passenger-trip-requests/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Request created successfully:", response.data);
        navigate("/passenger-requests");
      })
      .catch((error) => console.error("Error creating request:", error));
  };

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={() => navigate(-1)}>
            {t("nav.back")}
          </button>
        </div>
      </div>

      <div className="template21-content">
        <div className="template21-left-column">
          <h2>{t("menu")}</h2>
          <button onClick={handleSubmit} className="nav-button">
            {t("save_and_close")}
          </button>
          <button onClick={() => navigate(-1)} className="nav-button">
            {t("cancel")}
          </button>
        </div>

        <div className="template21-right-column">
          <div className="pass-request-registration-fields">
            <input
              type="text"
              name="passenger_first_name"
              placeholder={t("passenger_first_name")}
              value={formData.passenger_first_name}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="text"
              name="passenger_last_name"
              placeholder={t("passenger_last_name")}
              value={formData.passenger_last_name}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="text"
              name="passenger_phone"
              placeholder={t("passenger_phone")}
              value={formData.passenger_phone}
              onChange={handleChange}
              className="form-control"
            />
            <textarea
              name="comment"
              placeholder={t("comment")}
              value={formData.comment}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassengersTripRequest;
