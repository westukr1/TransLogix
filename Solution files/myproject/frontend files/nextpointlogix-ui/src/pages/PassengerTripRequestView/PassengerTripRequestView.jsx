import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TwoColumnTemplate.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PassengerTripRequestView = () => {
  const { t, i18n } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewMode, setViewMode] = useState("day");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
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
      .catch((error) => console.error("Error fetching requests data:", error));
  };

  const columnDefs = [
    { headerName: t("passenger"), field: "passenger" },
    { headerName: t("endpoint_type"), field: "endpoint_type" },
    { headerName: t("planned_datetime"), field: "planned_datetime" },
    { headerName: t("pickup_point"), field: "pickup_point" },
    {
      headerName: t("pickup_coordinates"),
      valueGetter: (params) =>
        `${params.data.pickup_latitude}, ${params.data.pickup_longitude}`,
    },
    { headerName: t("dropoff_point"), field: "dropoff_point" },
    {
      headerName: t("dropoff_coordinates"),
      valueGetter: (params) =>
        `${params.data.dropoff_latitude}, ${params.data.dropoff_longitude}`,
    },
    { headerName: t("direction"), field: "direction" },
    { headerName: t("is_active"), field: "is_active" },
    { headerName: t("comment"), field: "comment" },
  ];

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={fetchRequests}>
            {t("update_table")}
          </button>
          <button className="nav-button">{t("add_request")}</button>
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
          <div style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="radio"
                checked={viewMode === "day"}
                onChange={() => setViewMode("day")}
              />{" "}
              {t("day")}
            </label>
            <label>
              <input
                type="radio"
                checked={viewMode === "yesterday_today_tomorrow"}
                onChange={() => setViewMode("yesterday_today_tomorrow")}
              />{" "}
              {t("yesterday_today_tomorrow")}
            </label>
            <label>
              <input
                type="radio"
                checked={viewMode === "week"}
                onChange={() => setViewMode("week")}
              />{" "}
              {t("week")}
            </label>
            <label>
              <input
                type="radio"
                checked={viewMode === "month"}
                onChange={() => setViewMode("month")}
              />{" "}
              {t("month")}
            </label>
            <label>
              <input
                type="radio"
                checked={viewMode === "custom"}
                onChange={() => setViewMode("custom")}
              />{" "}
              {t("custom_interval")}
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
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
