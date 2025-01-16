import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./RepeatTripView.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const RepeatTripView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const passengerId = location.state?.passengerId;

  const [passengerData, setPassengerData] = useState({});
  const [coordinatePoints, setCoordinatePoints] = useState([]);
  const homeToWorkTrip = location.state?.homeToWorkTrip;
  const workToHomeTrip = location.state?.workToHomeTrip;

  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchPassengerData = async () => {
      if (!passengerId) {
        console.error("Passenger ID is missing!");
        return;
      }

      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://localhost:8000/api/passengers/${passengerId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log("Fetched passenger data:", data);
        setPassengerData(data);
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    };

    fetchPassengerData();
  }, [passengerId]);

  const fetchPointData = async (pointId) => {
    const token = localStorage.getItem("access_token");

    // 🔍 Логування ID точки перед запитом
    console.log(`Запит на отримання даних для точки ID: ${pointId}`);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/coordinate-points/${pointId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔍 Логування відповіді сервера
      console.log(`Відповідь сервера для точки ID ${pointId}:`, response.data);

      return response.data;
    } catch (error) {
      // ❗ Логування помилки
      console.error(
        `Помилка при отриманні даних для точки ID ${pointId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  };
  const handleSaveTrips = async () => {
    const token = localStorage.getItem("access_token");
    try {
      for (const trip of tripData) {
        const payload = {
          passenger: passengerId,
          direction: trip.direction,
          departure_time: trip.departure_time,
          arrival_time: trip.arrival_time,
          pickup_point: trip.pickup_point, // ✅ Передаємо ID точки посадки
          dropoff_point: trip.dropoff_point, // ✅ Передаємо ID точки висадки
          pickup_latitude: parseFloat(trip.start_latitude), // ✅ Переконалися, що це число
          pickup_longitude: parseFloat(trip.start_longitude),
          dropoff_latitude: parseFloat(trip.finish_latitude),
          dropoff_longitude: parseFloat(trip.finish_longitude),
          comment: trip.comment || "",
          is_active: true,
        };

        // 🔍 Додаткове логування для перевірки даних
        console.log("📦 Дані для збереження:", payload);

        await axios.post(
          "http://localhost:8000/api/passenger-trip-requests/create/",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      alert(t("trip_requests.saved_successfully"));
      navigate("/");
    } catch (error) {
      console.error(
        "❌ Помилка збереження заявок:",
        error.response?.data || error.message
      );
      alert(t("trip_requests.save_error"));
    }
  };

  const handleDeleteRow = (id) => {
    setTripData((prevData) => prevData.filter((trip) => trip.id !== id));
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const tripResults = [];

        // Перевірка для поїздки 'На роботу'
        if (homeToWorkTrip?.start && homeToWorkTrip?.finish) {
          const homeStart = await fetchPointData(homeToWorkTrip.start);
          const homeFinish = await fetchPointData(homeToWorkTrip.finish);

          tripResults.push({
            id: 1,
            direction: "HOME_TO_WORK",

            departure_time: homeToWorkTrip.departure_time,
            arrival_time: homeToWorkTrip.arrival_time,
            pickup_point: homeToWorkTrip.start, // ✅ Додаємо ID точки посадки
            dropoff_point: homeToWorkTrip.finish, // ✅ Додаємо ID точки висадки
            start_address: `${homeStart.city}, ${homeStart.street}, ${homeStart.house_number}`,
            start_latitude: parseFloat(homeStart.latitude),
            start_longitude: parseFloat(homeStart.longitude),
            finish_address: `${homeFinish.city}, ${homeFinish.street}, ${homeFinish.house_number}`,
            finish_latitude: parseFloat(homeFinish.latitude),
            finish_longitude: parseFloat(homeFinish.longitude),
            comment: "",
          });
        }

        // Перевірка для поїздки 'Додому'
        if (workToHomeTrip?.start && workToHomeTrip?.finish) {
          const workStart = await fetchPointData(workToHomeTrip.start);
          const workFinish = await fetchPointData(workToHomeTrip.finish);

          tripResults.push({
            id: 2,
            direction: "WORK_TO_HOME",

            departure_time: workToHomeTrip.departure_time,
            arrival_time: workToHomeTrip.arrival_time,
            pickup_point: workToHomeTrip.start, // ✅ Додаємо ID точки посадки
            dropoff_point: workToHomeTrip.finish, // ✅ Додаємо ID точки висадки
            start_address: `${workStart.city}, ${workStart.street}, ${workStart.house_number}`,
            start_latitude: parseFloat(workStart.latitude),
            start_longitude: parseFloat(workStart.longitude),
            finish_address: `${workFinish.city}, ${workFinish.street}, ${workFinish.house_number}`,
            finish_latitude: parseFloat(workFinish.latitude),
            finish_longitude: parseFloat(workFinish.longitude),
            comment: "",
          });
        }

        console.log("📊 Дані для таблиці:", tripResults);
        setTripData(tripResults);
      } catch (error) {
        console.error("❌ Помилка при отриманні даних для поїздки:", error);
      }
    };

    fetchTripData();
  }, [homeToWorkTrip, workToHomeTrip]);

  const columnDefs = [
    {
      headerName: t("table.actions"),
      field: "actions",
      width: 70,
      cellRenderer: (params) => (
        <button
          style={{
            height: "20px",
            margin: "0px",
            background: "black",
            color: "white",
            fontsize: "30%",
          }}
          onClick={() => handleDeleteRow(params.data.id)}
        >
          {t("table.delete")}
        </button>
      ),
    },
    {
      headerName: t("table.direction"),
      field: "direction",
      width: 150,
      cellStyle: { fontWeight: "bold" },
    },
    {
      headerName: t("table.departure"),
      children: [
        {
          headerName: t("table.departure_time"),
          field: "departure_time",
          width: 200,
          valueFormatter: (params) => formatDateTime(params.value),
          cellStyle: { fontWeight: "bold" },
        },
        {
          headerName: t("table.start_address"),
          field: "start_address",
          width: 200,
        },
        {
          headerName: t("table.start_latitude"),
          field: "start_latitude",
          width: 150,
        },
        {
          headerName: t("table.start_longitude"),
          field: "start_longitude",
          width: 150,
        },
      ],
    },
    {
      headerName: t("table.arrival"),
      children: [
        {
          headerName: t("table.arrival_time"),
          field: "arrival_time",
          width: 200,
          valueFormatter: (params) => formatDateTime(params.value),
          cellStyle: { fontWeight: "bold" },
        },
        {
          headerName: t("table.finish_address"),
          field: "finish_address",
          width: 200,
        },
        {
          headerName: t("table.finish_latitude"),
          field: "finish_latitude",
          width: 150,
        },
        {
          headerName: t("table.finish_longitude"),
          field: "finish_longitude",
          width: 150,
        },
      ],
    },
    {
      headerName: t("table.comment"),
      field: "comment",
      width: 300,
      editable: true,
      cellEditor: "agLargeTextCellEditor",
      cellEditorParams: {
        maxLength: 500,
        cols: 50,
        rows: 6,
        placeholder: t("table.comment_placeholder"),
      },
    },
  ];

  const formatDateTime = (datetime) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
        </div>
        <div className="ptv-template2s-right-column">
          <div className="ptv-upper-right">
            <h1
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              {t("trip_request_for_passenger")}: {passengerData.first_name}{" "}
              {passengerData.last_name}
            </h1>
            <h1
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              {t("phone_number")}: {passengerData.phone_number}, {t("email")}:{" "}
              {passengerData.email}
            </h1>

            <AgGridReact
              rowData={tripData}
              columnDefs={columnDefs}
              className="ag-theme-balham"
              style={{ height: "140px", width: "100%" }}
            />
            <button onClick={handleSaveTrips} className="nav-button">
              {t("trip_requests.save_button")}
            </button>
          </div>
          <div className="ptv-middle-right">
            <h1>{t("repeat_trip_title")}</h1>
          </div>
          <div className="ptv-lower-right">
            <h2>Lower Right Content</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatTripView;
