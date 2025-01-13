import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import { useTranslation } from "react-i18next";

const PointsSelectView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const passengerId = new URLSearchParams(location.search).get("id");
  const [passengerData, setPassengerData] = useState({});
  const [coordinatePoints, setCoordinatePoints] = useState([]);
  const [activeTab, setActiveTab] = useState("work");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  useEffect(() => {
    if (passengerId) {
      fetchPassengerData();
      fetchCoordinatePoints();
    }
  }, [passengerId]);

  const fetchPassengerData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/passengers/${passengerId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch passenger data");
      }
      const data = await response.json();
      setPassengerData(data);
    } catch (error) {
      console.error("Error fetching passenger data:", error);
    }
  };

  const fetchCoordinatePoints = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/passengers/${passengerId}/coordinates/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coordinate points");
      }
      const data = await response.json();
      setCoordinatePoints(data);
    } catch (error) {
      console.error("Error fetching coordinate points:", error);
    }
  };

  const columnDefs = [
    { headerName: t("ID"), field: "id", width: 60 },
    { headerName: t("Type"), field: "point_type", width: 100 },
    { headerName: t("City"), field: "city", width: 150 },
    { headerName: t("Street"), field: "street", width: 150 },
    { headerName: t("House Number"), field: "house_number", width: 100 },
    { headerName: t("Latitude"), field: "latitude", width: 150 },
    { headerName: t("Longitude"), field: "longitude", width: 150 },
  ];
  const getTabStyle = (tab) => ({
    transform: activeTab === tab ? "scale(1.3)" : "scale(1)",
    transition: "transform 0.3s ease",
    padding: "10px 20px",
    margin: "0 5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: activeTab === tab ? "#4CAF50" : "#f1f1f1",
    color: activeTab === tab ? "white" : "black",
    borderRadius: "5px",
  });
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
        </div>
        <div className="template21-right-column">
          <h1
            style={{
              color: "white",
              fontsize: "100%",
            }}
          >
            {t("trip_request_for_passenger")}: {passengerData.first_name}{" "}
            {passengerData.last_name}
          </h1>
          <h1
            style={{
              color: "white",
              fontsize: "100%",
            }}
          >
            {t("phone_number")}: {passengerData.phone_number}
          </h1>
          <p
            style={{
              color: "white",
              fontsize: "100%",
            }}
          >
            {t("email")}: {passengerData.email}
          </p>
          <h1
            style={{
              color: "white",
              fontsize: "50%",
            }}
          >
            {" "}
            {t("direction_of_travel")}{" "}
          </h1>
          <div className="tabs">
            <button
              style={getTabStyle("work")}
              onClick={() => setActiveTab("work")}
            >
              {t("to_work")}
            </button>
            <button
              style={getTabStyle("home")}
              onClick={() => setActiveTab("home")}
            >
              {t("to_home")}
            </button>
          </div>
          {activeTab === "work" ? (
            <>
              <h1 style={{ color: "white", fontSize: "100%" }}>
                {t("Preferred_time_of_arrival_at_work")}
              </h1>
              <input
                type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                placeholder={t("arrival_time")}
                className="form-control"
              />
              <h1 style={{ color: "white", fontSize: "100%" }}>
                {t("select_pickup_points")}
              </h1>
              <div
                className="psv-ag-theme-alpine"
                style={{ height: "200px", width: "100%" }}
              >
                <AgGridReact
                  rowData={coordinatePoints.filter(
                    (point) => point.point_type === "pickup"
                  )}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                />
              </div>
              <h1 style={{ color: "white", fontSize: "100%" }}>
                {t("select_work_points")}
              </h1>
              <div
                className="psv-ag-theme-alpine"
                style={{ height: "200px", width: "100%" }}
              >
                <AgGridReact
                  rowData={coordinatePoints.filter(
                    (point) => point.point_type === "work"
                  )}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                />
              </div>
            </>
          ) : (
            <>
              <h1 style={{ color: "white", fontSize: "100%" }}>
                {t("Preferred_time_of_departure_home")}
              </h1>
              <input
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                placeholder={t("departure_time")}
                className="form-control"
              />
              <h1 style={{ color: "white", fontSize: "100%" }}>
                {t("select_work_points")}
              </h1>
              <div
                className="psv-ag-theme-alpine"
                style={{ height: "200px", width: "100%" }}
              >
                <AgGridReact
                  rowData={coordinatePoints.filter(
                    (point) => point.point_type === "work"
                  )}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                />
                <h1 style={{ color: "white", fontSize: "100%" }}>
                  {t("select_pickup_points")}
                </h1>
                <AgGridReact
                  rowData={coordinatePoints.filter(
                    (point) => point.point_type === "pickup"
                  )}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointsSelectView;
