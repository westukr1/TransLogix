import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PassengerTripRequestView = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewMode, setViewMode] = useState("yesterday_today_tomorrow");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setStartDate(yesterday.toISOString().split("T")[0]);
    setEndDate(tomorrow.toISOString().split("T")[0]);
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/passenger-trip-requests/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log("Passenger Trip Requests Data:", response.data);
      })
      .catch((error) => console.error("Error fetching requests data:", error))
      .finally(() => setLoading(false));
  };
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    const today = new Date();
    let newStartDate, newEndDate;

    switch (mode) {
      case "day":
        newStartDate = today;
        newEndDate = today;
        break;
      case "yesterday_today_tomorrow":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 1);
        newEndDate = new Date(today);
        newEndDate.setDate(today.getDate() + 1);
        break;
      case "week":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 3);
        newEndDate = new Date(today);
        newEndDate.setDate(today.getDate() + 3);
        break;
      case "month":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 15);
        newEndDate = new Date(today);
        newEndDate.setDate(today.getDate() + 15);
        break;
      case "custom":
        return; // У довільному режимі дати не змінюються
      default:
        return;
    }

    setStartDate(newStartDate.toISOString().split("T")[0]);
    setEndDate(newEndDate.toISOString().split("T")[0]);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    if (viewMode !== "custom") {
      setEndDate(value);
    }
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    if (viewMode !== "custom") {
      setStartDate(value);
    }
  };

  const columnDefs = [
    { headerName: t("passenger_id"), field: "passenger_id", width: 100 },
    {
      headerName: t("passenger_first_name"),
      field: "passenger_first_name",
      width: 130,
    },
    {
      headerName: t("passenger_last_name"),
      field: "passenger_last_name",
      width: 130,
    },
    { headerName: t("passenger_phone"), field: "passenger_phone", width: 150 },
    { headerName: t("direction"), field: "direction", width: 70 },
    { headerName: t("endpoint_type"), field: "endpoint_type", width: 70 },
    {
      headerName: t("planned_datetime"),
      field: "planned_datetime",
      width: 170,
    },
    { headerName: t("pickup_city"), field: "pickup_city", width: 100 },
    { headerName: t("pickup_street"), field: "pickup_street", width: 150 },
    { headerName: t("pickup_house"), field: "pickup_house", width: 60 },
    { headerName: t("pickup_latitude"), field: "pickup_latitude", width: 100 },
    {
      headerName: t("pickup_longitude"),
      field: "pickup_longitude",
      width: 100,
    },
    { headerName: t("dropoff_city"), field: "dropoff_city", width: 100 },
    { headerName: t("dropoff_street"), field: "dropoff_street", width: 150 },
    { headerName: t("dropoff_house"), field: "dropoff_house", width: 60 },
    {
      headerName: t("dropoff_latitude"),
      field: "dropoff_latitude",
      width: 100,
    },
    {
      headerName: t("dropoff_longitude"),
      field: "dropoff_longitude",
      width: 100,
    },
    { headerName: t("is_active"), field: "is_active", width: 60 },
    { headerName: t("comment"), field: "comment", width: 600 },
  ];

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
          <button onClick={fetchRequests} className="nav-button">
            {t("update_table")}
          </button>
          <button className="nav-button">{t("add_request")}</button>
        </div>
        <div className="template21-right-column">
          {["day", "yesterday_today_tomorrow", "week", "month", "custom"].map(
            (mode) => (
              <label key={mode}>
                <input
                  type="radio"
                  checked={viewMode === mode}
                  onChange={() => handleViewModeChange(mode)}
                />{" "}
                {t(mode)}
              </label>
            )
          )}

          <div style={{ marginBottom: "10px" }}>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input type="date" value={endDate} onChange={handleEndDateChange} />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 160px)", width: "100%" }}
          >
            <AgGridReact
              rowData={requests}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerTripRequestView;
