import React, { useState } from "react";
import "./GroupingListToRoute.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GroupingListToRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passengerData] = useState([
    { id: 1, name: "John Doe", location: "Lviv", time: "07:00" },
    { id: 2, name: "Jane Smith", location: "Boryslav", time: "08:00" },
  ]);

  const columns = [
    { headerName: t("name"), field: "name", sortable: true, filter: true },
    {
      headerName: t("location"),
      field: "location",
      sortable: true,
      filter: true,
    },
    { headerName: t("time"), field: "time", sortable: true, filter: true },
  ];

  return (
    <div className="gltr-two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <h1 className="header-title">{t("grouping_list_to_route")}</h1>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={() => navigate(-1)}>
            {t("nav.back")}
          </button>
        </div>
      </div>
      <div className="gltr-template2s-content">
        {/* Left Column */}
        <div className="gltr-template2s-left-column">
          <div>
            <button className="nav-button">{t("save")}</button>
            <div style={{ marginTop: "20px" }}>
              <label>{t("start_time")}</label>
              <input
                type="datetime-local"
                value={startDate.toISOString().slice(0, 16)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label>{t("end_time")}</label>
              <input
                type="datetime-local"
                value={endDate.toISOString().slice(0, 16)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="form-control"
              />
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "50%", marginTop: "20px" }}
          >
            <AgGridReact
              rowData={passengerData}
              columnDefs={columns}
              pagination
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="gltr-template2s-right-column">
          <div className="gltr-template2s-upper-right">
            <h1>{t("route_summary")}</h1>
            <h3>
              {t("direction")}: {t("work")} <strong>&#8226;</strong>{" "}
              {t("direction")}: Lviv → Drohobych <strong>&#8226;</strong>{" "}
              {t("distance")}: 100 km <strong>&#8226;</strong>{" "}
              {t("estimated_time")}: 2h <strong>&#8226;</strong>{" "}
              {t("start_time")}: 07:00 <strong>&#8226;</strong> {t("end_time")}:
              09:00 <strong>&#8226;</strong> {t("stop_count")}: 5{" "}
              <strong>&#8226;</strong> {t("passenger_count")}: 15{" "}
              <strong>&#8226;</strong> {t("status")}: {t("not_fixed")}
            </h3>
          </div>
          <div className="gltr-template2s-lower-right">
            <h2>{t("selected_passengers")}</h2>
            <div className="ag-theme-alpine" style={{ height: "100%" }}>
              <AgGridReact rowData={[]} columnDefs={columns} pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupingListToRoute;
