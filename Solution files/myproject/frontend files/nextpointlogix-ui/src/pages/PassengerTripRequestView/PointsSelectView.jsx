import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const PointsSelectView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const passengerId = new URLSearchParams(location.search).get("id");
  const [passengerData, setPassengerData] = useState({});
  const [coordinatePoints, setCoordinatePoints] = useState([]);
  const [activeTab, setActiveTab] = useState("work");
  const [arrivalTime, setArrivalTime] = useState("");
  const [selectedPointId, setSelectedPointId] = useState(null);
  const [departureTime, setDepartureTime] = useState("");

  const [selectedPoints, setSelectedPoints] = useState({
    pickupHomeToWork: null,
    dropoffAtWork: null,
    pickupWorkToHome: null,
    dropoffAtHome: null,
  });

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
        `http://localhost:8000/api/passenger/${passengerId}/addresses/`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coordinate points");
      }
      const data = await response.json();
      console.log("Received addresses:", data);
      setCoordinatePoints(data.filter((point) => point.is_active));
    } catch (error) {
      console.error("Error fetching coordinate points:", error);
    }
  };
  const handleCheckboxChange = (category, pointId) => {
    setSelectedPoints((prev) => ({
      ...prev,
      [category]: prev[category] === pointId ? null : pointId,
    }));
  };

  const createCheckboxColumn = (category) => ({
    headerName: t("Select"),
    field: category,
    width: 60,
    cellRenderer: (params) => (
      <input
        type="checkbox"
        checked={selectedPoints[category] === params.data.id}
        onChange={() => handleCheckboxChange(category, params.data.id)}
      />
    ),
  });
  const baseColumnDefs = [
    // {
    //   headerName: "",
    //   field: "select",
    //   width: 50,
    //   cellRenderer: (params) => (
    //     <input
    //       type="checkbox"
    //       checked={selectedPointId === params.data.id}
    //       onChange={() => setSelectedPointId(params.data.id)}
    //     />
    //   ),
    // },
    { headerName: t("Id"), field: "id", width: 60 },
    { headerName: t("point_type"), field: "point_type", width: 100 },
    { headerName: t("city"), field: "city", width: 150 },
    { headerName: t("street"), field: "street", width: 150 },
    { headerName: t("house_number"), field: "house_number", width: 100 },
    { headerName: t("latitude"), field: "latitude", width: 100 },
    { headerName: t("longitude"), field: "longitude", width: 100 },
    { headerName: t("country"), field: "country", width: 100 },
    { headerName: t("region"), field: "region", width: 120 },
    { headerName: t("district"), field: "district", width: 150 },
    {
      headerName: t("first_name"),
      field: "owner_first_name",
      width: 100,
    },
    { headerName: t("last_name"), field: "owner_last_name", width: 100 },
    { headerName: t("owner_id"), field: "owner_id", width: 60 },
    { headerName: t("owner_type"), field: "owner_type", width: 100 },
    { headerName: t("is_active"), field: "is_active", width: 60 },
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
  const createTripRequests = () => {
    console.log("📦 Вибрані точки:", selectedPoints);
    console.log("📅 Час прибуття:", arrivalTime);
    console.log("📅 Час відправлення:", departureTime);

    const homeToWorkTrip = {
      start: selectedPoints.pickupHomeToWork,
      finish: selectedPoints.dropoffAtWork,
      arrival_time: arrivalTime || null,
      departure_time: null,
    };

    const workToHomeTrip = {
      start: selectedPoints.pickupWorkToHome,
      finish: selectedPoints.dropoffAtHome,
      departure_time: departureTime || null,
      arrival_time: null,
    };

    const isHomeToWorkValid =
      homeToWorkTrip.start &&
      homeToWorkTrip.finish &&
      (homeToWorkTrip.arrival_time || homeToWorkTrip.departure_time);
    const isWorkToHomeValid =
      workToHomeTrip.start &&
      workToHomeTrip.finish &&
      (workToHomeTrip.arrival_time || workToHomeTrip.departure_time);

    if (!isHomeToWorkValid) {
      console.warn(
        "⚠️ Неповні дані для поїздки 'На роботу' (не вистачає часу)"
      );
    }

    if (!isWorkToHomeValid) {
      console.warn("⚠️ Неповні дані для поїздки 'Додому' (не вистачає часу)");
    }

    if (isHomeToWorkValid || isWorkToHomeValid) {
      navigate("/repeat-trip-view", {
        state: {
          passengerId: passengerId,
          homeToWorkTrip,
          workToHomeTrip,
          direction: activeTab,
        },
      });
    } else {
      console.warn("⚠️ Немає повних даних для жодної поїздки!");
    }
  };

  const isTripDataComplete = () => {
    const homeToWorkComplete =
      selectedPoints.pickupHomeToWork &&
      selectedPoints.dropoffAtWork &&
      arrivalTime;
    const workToHomeComplete =
      selectedPoints.pickupWorkToHome &&
      selectedPoints.dropoffAtHome &&
      departureTime;
    return homeToWorkComplete || workToHomeComplete;
  };
  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="date-time">{new Date().toLocaleString()}</div>
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
          <button
            onClick={() =>
              navigate(`/edit-passenger/${passengerId}`, {
                state: { passengerData },
              })
            }
            className="nav-button"
          >
            {t("edit_passenger_data")}
          </button>
          <button
            onClick={() =>
              navigate(`/edit-passenger-addresses`, {
                state: {
                  passengerId: passengerData.id,
                  pickupAddresses: passengerData.pickup_addresses,
                  dropoffAddresses: passengerData.dropoff_addresses,
                  workAddresses: passengerData.work_addresses,
                },
              })
            }
            className="nav-button"
          >
            {t("edit_passenger_addresses")}
          </button>
          <button
            className="nav-button"
            onClick={createTripRequests}
            disabled={!isTripDataComplete()}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: isTripDataComplete() ? "#4CAF50" : "#D3D3D3",
              color: isTripDataComplete() ? "white" : "#888",
              cursor: isTripDataComplete() ? "pointer" : "not-allowed",
            }}
          >
            {t("create_trip_requests")}
          </button>
        </div>
        <div className="ptrv-template21-right-column">
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
          <p
            style={{
              fontSize: "18px",
              width: "60%",
              color: isTripDataComplete() ? "#4CAF50" : "#FF0000",
            }}
          >
            {t("request_create_warning")}
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
          <div>
            <div>
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
                      columnDefs={[
                        createCheckboxColumn("pickupHomeToWork"),
                        ...baseColumnDefs,
                      ]}
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
                      columnDefs={[
                        createCheckboxColumn("dropoffAtWork"),
                        ...baseColumnDefs,
                      ]}
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
                      columnDefs={[
                        createCheckboxColumn("pickupWorkToHome"),
                        ...baseColumnDefs,
                      ]}
                      pagination={true}
                      paginationPageSize={5}
                    />
                    <h1 style={{ color: "white", fontSize: "100%" }}>
                      {t("select_dropoff_points")}
                    </h1>
                    <AgGridReact
                      rowData={coordinatePoints.filter((point) =>
                        ["pickup", "dropoff"].includes(point.point_type)
                      )}
                      columnDefs={[
                        createCheckboxColumn("dropoffAtHome"),
                        ...baseColumnDefs,
                      ]}
                      pagination={true}
                      paginationPageSize={5}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}></div>
        </div>
      </div>
    </div>
  );
};

export default PointsSelectView;
