import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const PassengerTripRequestView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRequests();
  }, [startDate, endDate]);

  const fetchRequests = () => {
    const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    console.log("Відправка запиту на бекенд:", {
      start_date: start,
      end_date: end,
    });
    axios
      .get("http://localhost:8000/api/passenger-trip-requests/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        params: {
          start_date: start,
          end_date: end,
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log("Passenger Trip Requests Data:", response.data);
      })
      .catch((error) => console.error("Error fetching requests data:", error));
  };
  // const handleViewModeChange = (mode) => {
  //   setViewMode(mode);
  //   if (mode === "yesterday_today_tomorrow") {
  //     const today = new Date();
  //     const yesterday = new Date(today);
  //     yesterday.setDate(today.getDate() - 1);
  //     const tomorrow = new Date(today);
  //     tomorrow.setDate(today.getDate() + 1);
  //     setStartDate(yesterday);
  //     setEndDate(tomorrow);
  //     fetchRequests();
  //   }
  // };

  // const handleStartDateChange = (date) => {
  //   if (date > endDate) {
  //     setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
  //   }
  //   setStartDate(date);
  //   fetchRequests();
  // };

  // const handleEndDateChange = (date) => {
  //   if (date < startDate) {
  //     setStartDate(new Date(date.getTime() - 24 * 60 * 60 * 1000));
  //   }
  //   setEndDate(date);
  //   fetchRequests();
  // };

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
      valueFormatter: (params) =>
        dayjs(params.value).format("DD-MM-YYYY HH:mm"),
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
          <button
            className="nav-button"
            onClick={() => navigate("/passenger-select")}
          >
            {t("add_request")}
          </button>
        </div>
        <div className="template21-right-column">
          <div style={{ display: "flex", gap: "10px" }}>
            <h3
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              Data range from -
            </h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd-MM-yyyy"
              calendarClassName="custom-datepicker"
            />
            <h3
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              {" "}
              - to -{" "}
            </h3>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd-MM-yyyy"
              calendarClassName="custom-datepicker"
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
            style={{
              height: "600px",
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={requests}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerTripRequestView;
