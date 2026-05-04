import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./RepeatTripView.css";
import { useTranslation } from "react-i18next";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";




// Перевірка синхронізації 20/01/2025
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
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false); // ✅ Чекбокс
  const [startDate, setStartDate] = useState(new Date()); // ✅ Дата початку
  const [endDate, setEndDate] = useState(new Date()); // ✅ Дата завершення
  const [selectedDays, setSelectedDays] = useState([]); // ✅ Дні тижня
  const [finalTrips, setFinalTrips] = useState([]);

  useEffect(() => {
    const fetchPassengerData = async () => {
      if (!passengerId) {
        console.error("Passenger ID is missing!");
        return;
      }

      try {
        const response = await axios.get(API_ENDPOINTS.getPassengerDetails(passengerId));
        setPassengerData(response.data);
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    };

    fetchPassengerData();
  }, [passengerId]);

  const fetchPointData = async (pointId) => {
    console.log(`Запит на отримання даних для точки ID: ${pointId}`);
    try {
      const response = await axios.get(API_ENDPOINTS.getCoordinatePoint(pointId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching point data for ID ${pointId}:`, error);
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
          API_ENDPOINTS.createTripRequest,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      alert(t("trip_requests.saved_successfully"));
      navigate("/passenger-trip-requests");
    } catch (error) {
      console.error(
        "❌ Помилка збереження заявок:",
        error.response?.data || error.message
      );
      alert(t("trip_requests.save_error"));
    }
  };

  // ✅ Оновлена функція видалення
  const handleDeleteRow = (id) => {
    setFinalTrips((prevData) => prevData.filter((trip) => trip.id !== id));
  };

  useEffect(() => {
    if (isRepeatEnabled) {
      handleCombineTrips(); // 🔄 Оновлення при зміні
    }
  }, [startDate, endDate, selectedDays.tripData]);

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
  const daysOfWeek = [
    { label: t("Monday"), value: 1 },
    { label: t("Tuesday"), value: 2 },
    { label: t("Wednesday"), value: 3 },
    { label: t("Thursday"), value: 4 },
    { label: t("Friday"), value: 5 },
    { label: t("Saturday"), value: 6 },
    { label: t("Sunday"), value: 0 },
  ];

  const handleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  const handleCreateRepeatedTrips = async () => {
    if (!startDate || !endDate || selectedDays.length === 0) {
      alert(t("trip_requests.select_dates_warning"));
      return;
    }

    const token = localStorage.getItem("access_token");

    try {
      const payload = {
        trips: tripData,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        days_of_week: selectedDays,
      };

      console.log("📦 Дані для повторних заявок:", payload);

      await axios.post(API_ENDPOINTS.repeatTripRequests, payload);

      alert(t("trip_requests.repeated_successfully"));
    } catch (error) {
      console.error("❌ Помилка створення повторних заявок:", error);
      alert(t("trip_requests.repeat_error"));
    }
  };
  // ✅ Функція для генерації повторних заявок з оновленням даних
  /**
   * Функція для отримання мінімальної дати з верхньої таблиці
   */
  const getMinTripDate = () => {
    const today = dayjs();
    const tripDates = tripData.map((trip) =>
      dayjs(trip.arrival_time || trip.departure_time).valueOf()
    );
    const earliestTimestamp = tripDates.length
      ? Math.min(...tripDates)
      : today.valueOf();
    return dayjs(earliestTimestamp).isBefore(today)
      ? today
      : dayjs(earliestTimestamp);
  };

  /**
   * Оновлення мінімальної дати у DatePicker
   */
  useEffect(() => {
    const minDate = getMinTripDate().toDate();
    setStartDate(minDate);
  }, [tripData]);

  // ✅ Додаємо унікальний ID до кожної заявки
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  /**
   * Генерація повторних заявок
   */
  const handleCombineTrips = () => {
    if (!startDate || !endDate || selectedDays.length === 0) {
      //  PassengerSelectView/
      return;
    }

    let updatedTrips = [...tripData.filter((trip) => !trip.repeated)];

    selectedDays.forEach((dayOfWeek) => {
      let currentDate = dayjs(startDate);
      while (currentDate.isBefore(dayjs(endDate).add(1, "day"))) {
        if (currentDate.day() === dayOfWeek) {
          tripData.forEach((trip) => {
            const plannedTime = dayjs(currentDate)
              .hour(dayjs(trip.arrival_time || trip.departure_time).hour())
              .minute(dayjs(trip.arrival_time || trip.departure_time).minute());

            const isDuplicate = updatedTrips.some(
              (existingTrip) =>
                existingTrip.direction === trip.direction &&
                dayjs(
                  existingTrip.arrival_time || existingTrip.departure_time
                ).isSame(plannedTime, "minute") &&
                existingTrip.pickup_point === trip.pickup_point &&
                existingTrip.dropoff_point === trip.dropoff_point
            );

            if (!isDuplicate) {
              updatedTrips.push({
                ...trip,
                id: `${trip.direction}-${plannedTime.toISOString()}`,
                departure_time:
                  trip.direction === "HOME_TO_WORK"
                    ? null
                    : plannedTime.toISOString(),
                arrival_time:
                  trip.direction === "HOME_TO_WORK"
                    ? plannedTime.toISOString()
                    : null,
                repeated: true,
              });
            }
          });
        }
        currentDate = currentDate.add(1, "day");
      }
    });

    console.log("📊 Оновлені заявки (без дублікатів):", updatedTrips);
    setFinalTrips(updatedTrips);
  };

  // ✅ Функція для збереження всіх заявок
  const handleSaveAllTrips = async () => {
    const token = localStorage.getItem("access_token");

    try {
      for (const trip of finalTrips) {
        const payload = {
          passenger: passengerId,
          direction: trip.direction,
          departure_time: trip.departure_time,
          arrival_time: trip.arrival_time,
          pickup_point: trip.pickup_point,
          dropoff_point: trip.dropoff_point,
          pickup_latitude: parseFloat(trip.start_latitude),
          pickup_longitude: parseFloat(trip.start_longitude),
          dropoff_latitude: parseFloat(trip.finish_latitude),
          dropoff_longitude: parseFloat(trip.finish_longitude),
          comment: trip.comment,
          is_active: true,
        };
        console.log(typeof passengerId); // має вивести "number"

        await axios.post(API_ENDPOINTS.createTripRequest, payload);
      }

      alert(t("trip_requests.saved_successfully"));
      navigate("/passenger-trip-requests");
    } catch (error) {
      console.error("❌ Помилка збереження заявок:", error);
      alert(t("trip_requests.save_error"));
    }
  };
  // ✅ Функція для обробки чекбокса
  const handleToggleRepeat = () => {
    setIsRepeatEnabled(!isRepeatEnabled);

    if (!isRepeatEnabled) {
      const combinedTrips = tripData.map((trip) => ({
        ...trip,
        repeated: false, // ❗️ Позначаємо заявки як оригінальні
      }));
      setFinalTrips(combinedTrips); // 📥 Додаємо у нижню таблицю
    } else {
      setFinalTrips([]); // ❗️ Очищення при вимкненні
    }
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
            {/* ✅ Кнопка "Зберегти" зникає, якщо активний чекбокс */}
            {!isRepeatEnabled && (
              <button onClick={handleSaveTrips} className="nav-button">
                {t("trip_requests.save_button")}
              </button>
            )}
          </div>
          {/* ✅ Середня секція — відображається, якщо чекбокс активний */}
          <div className="ptv-middle-right">
            <h2>{t("plan_repeated_trips")}</h2>

            <label>
              <input
                type="checkbox"
                checked={isRepeatEnabled}
                onChange={handleToggleRepeat}
              />
              {t("enable_repeated_trips")}
            </label>

            {isRepeatEnabled && (
              <>
                {/* ✅ Дата початку з обмеженням мінімальної дати */}
                <div style={{ marginTop: "10px" }}>
                  <label>{t("start_date")}:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    minDate={getMinTripDate().toDate()} // ❗ Мінімальна дата
                  />
                </div>

                {/* ✅ Дата завершення */}
                <div style={{ marginTop: "10px" }}>
                  <label>{t("end_date")}:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    minDate={startDate} // ❗ Дата завершення не може бути раніше початку
                  />
                </div>

                {/* ✅ Дні тижня */}
                <div style={{ marginTop: "10px" }}>
                  <label>{t("select_days_of_week")}:</label>
                  {daysOfWeek.map((day) => (
                    <div key={day.value}>
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day.value)}
                        onChange={() => handleDaySelection(day.value)}
                      />
                      {day.label}
                    </div>
                  ))}
                </div>

                {/* ✅ Кнопка створення заявок */}
                <button
                  onClick={handleCombineTrips}
                  style={{ marginTop: "15px", padding: "10px 20px" }}
                >
                  {t("create_repeated_trips")}
                </button>
              </>
            )}
          </div>

          {/* ✅ Нижня таблиця — з’являється після генерації заявок */}
          {isRepeatEnabled && (
            <div className="ptv-lower-right">
              <h1>{t("created_trip_requests")}</h1>

              <AgGridReact
                rowData={finalTrips}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                className="ag-theme-alpine"
                style={{ height: "300px", width: "100%" }}
              />

              {/* ✅ Кнопка "Зберегти заявки" */}
              <button
                onClick={handleSaveAllTrips}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              >
                {t("trip_requests.save_button")}
              </button>

              {/* ❌ Кнопка "Вийти без збереження" */}
              <button
                onClick={() => navigate("/passenger-trip-requests")}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#d9534f",
                  color: "white",
                }}
              >
                {t("trip_requests.exit_without_saving")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepeatTripView;
