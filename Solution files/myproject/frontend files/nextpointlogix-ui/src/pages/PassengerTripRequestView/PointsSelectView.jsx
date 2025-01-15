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
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyLoaded, setIsApiKeyLoaded] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState({
    pickupHomeToWork: null,
    dropoffAtWork: null,
    pickupWorkToHome: null,
    dropoffAtHome: null,
  });

  useEffect(() => {
    const fetchGoogleMapsKey = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:8000/api/google-maps-key/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApiKey(response.data.google_maps_api_key);
        setIsApiKeyLoaded(true);
      } catch (error) {
        console.error("Помилка при отриманні ключа Google Maps:", error);
      }
    };

    fetchGoogleMapsKey();
  }, []);

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
    { headerName: t("ID"), field: "id", width: 60 },
    { headerName: t("Type"), field: "point_type", width: 100 },
    { headerName: t("City"), field: "city", width: 150 },
    { headerName: t("Street"), field: "street", width: 150 },
    { headerName: t("House Number"), field: "house_number", width: 100 },
    { headerName: t("Latitude"), field: "latitude", width: 150 },
    { headerName: t("Longitude"), field: "longitude", width: 150 },
    { headerName: t("Country"), field: "country", width: 150 },
    { headerName: t("Region"), field: "region", width: 150 },
    { headerName: t("District"), field: "district", width: 150 },
    {
      headerName: t("Owner First Name"),
      field: "owner_first_name",
      width: 150,
    },
    { headerName: t("Owner Last Name"), field: "owner_last_name", width: 150 },
    { headerName: t("Owner ID"), field: "owner_id", width: 100 },
    { headerName: t("Owner Type"), field: "owner_type", width: 100 },
    { headerName: t("Is Active"), field: "is_active", width: 100 },
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
    const homeToWorkTrip = {
      pickup: selectedPoints["pickupHomeToWork"],
      dropoff: selectedPoints["dropoffAtWork"],
    };
    const workToHomeTrip = {
      pickup: selectedPoints["pickupWorkToHome"],
      dropoff: selectedPoints["dropoffAtHome"],
    };

    if (homeToWorkTrip.pickup && homeToWorkTrip.dropoff) {
      console.log("Home to Work Trip:", homeToWorkTrip);
    } else {
      console.warn("Incomplete Home to Work trip");
    }

    if (workToHomeTrip.pickup && workToHomeTrip.dropoff) {
      console.log("Work to Home Trip:", workToHomeTrip);
    } else {
      console.warn("Incomplete Work to Home trip");
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
          <p
            style={{
              fontSize: "18px",

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
