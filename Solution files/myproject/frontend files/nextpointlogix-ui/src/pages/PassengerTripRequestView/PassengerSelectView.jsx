import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PassengerSelectView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBySelected, setFilterBySelected] = useState(false);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async (isActive = true) => {
    const token = localStorage.getItem("access_token");
    const url = `http://localhost:8000/api/passengers/?is_active=${isActive}`;
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch passengers");
      }
      const data = await response.json();
      console.log("Fetched passengers:", data);
      setPassengers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const handleSelectPassenger = (id) => {
    navigate(`/new-passenger-trip-request?id=${id}`);
  };

  const filteredPassengers = searchQuery
    ? passengers.filter(
        (passenger) =>
          (passenger.first_name &&
            passenger.first_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (passenger.last_name &&
            passenger.last_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (passenger.phone_number &&
            passenger.phone_number.includes(searchQuery))
      )
    : passengers;

  const columnDefs = [
    {
      headerName: t("Select"),
      field: "select",
      width: 100,
      cellRenderer: (params) => (
        <button
          className="nav-button"
          onClick={() => handleSelectPassenger(params.data.id)}
        >
          {t("select")}
        </button>
      ),
    },
    { headerName: t("ID"), field: "id", width: 60 },
    { headerName: t("first_name"), field: "first_name", width: 100 },
    { headerName: t("last_name"), field: "last_name", width: 100 },
    { headerName: t("phone_number"), field: "phone_number", width: 150 },
    { headerName: t("email"), field: "email", width: 200 },
    { headerName: t("country"), field: "country", width: 100 },
    { headerName: t("region"), field: "region", width: 100 },
    { headerName: t("district"), field: "district", width: 100 },
    { headerName: t("city"), field: "city", width: 150 },
    { headerName: t("street"), field: "street", width: 150 },
    { headerName: t("house_number"), field: "house_number", width: 50 },
    { headerName: t("department"), field: "department", width: 200 },
    { headerName: t("latitude"), field: "latitude", width: 150 },
    { headerName: t("longitude"), field: "longitude", width: 150 },
    { headerName: t("is_active"), field: "is_active", width: 100 },
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
          <button onClick={fetchPassengers} className="nav-button">
            {t("update_table")}
          </button>
        </div>
        <div className="template21-right-column">
          <h1
            style={{
              color: "white",
              fontsize: "100%",
            }}
          >
            {t("select_passenger")}
          </h1>
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
          <div
            className="ag-theme-alpine"
            style={{ height: "800px", width: "100%" }}
          >
            <AgGridReact
              rowData={filteredPassengers}
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

export default PassengerSelectView;
