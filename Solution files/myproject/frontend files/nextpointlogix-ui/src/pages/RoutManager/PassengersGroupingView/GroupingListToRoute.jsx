import React, { useState, useEffect } from "react";
import "./GroupingListToRoute.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// Приклад для Жені/ Ще один приклад.
// Підключення плагіна utc для роботи з часовими зонами
dayjs.extend(utc);

const GroupingListToRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчуванням "en"

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(
    new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
  );
  const [passengerData, setPassengerData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [unselectedRequests, setUnselectedRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [directionFilter, setDirectionFilter] = useState("WORK_TO_HOME");
  const [allowMixedDirections, setAllowMixedDirections] = useState(false);
  const [allowExtendedInterval, setAllowExtendedInterval] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [routeSettings, setRouteSettings] = useState(null);
  const [showIncludedInList, setShowIncludedInList] = useState(false);
  const [showIncludedInRoute, setShowIncludedInRoute] = useState(false);

  const [routeDetails, setRouteDetails] = useState({
    distance: null,
    duration: null,
    stops: null,
    passengers: null,
    startAddress: null,
    endAddress: null,
  });

  const fetchRequests = () => {
    const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    console.log("Відправка запиту на бекенд:", {
      start_date: start,
      end_date: end,
    });
    axios
      .get("http://localhost:8000/api/filtered-passenger-trip-requests/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        params: {
          start_date: start,
          end_date: end,
          search: searchQuery,
        },
      })
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          is_selected: false,
        }));
        setAllRequests(data);
        setUnselectedRequests(data);
        setSelectedRequests([]); // Clear selected requests
        applyFilters(data);
      })
      .catch((error) => console.error("Error fetching requests data:", error));
  };
  // Функція для отримання налаштувань
  const fetchRouteSettings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-settings/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setRouteSettings(response.data);
    } catch (error) {
      console.error("Error fetching route settings:", error);
    }
  };

  useEffect(() => {
    fetchRouteSettings();
  }, []);

  const applyFilters = (data) => {
    const filteredData = data.filter((request) => {
      if (directionFilter === "ALL") {
        return true; // Показуємо всі заявки
      }
      if (request.direction !== directionFilter) {
        return false;
      }
      if (!showIncludedInList && request.included_in_list) {
        return false;
      }
      if (!showIncludedInRoute && request.included_in_route) {
        return false;
      }
      const requestDate = new Date(
        request.departure_time || request.arrival_time
      );
      return (
        allowExtendedInterval ||
        (requestDate >= startDate && requestDate <= endDate)
      );
    });
    setUnselectedRequests(filteredData);
  };

  useEffect(() => {
    fetchRequests();
  }, [
    startDate,
    endDate,
    searchQuery,
    directionFilter,
    allowMixedDirections,
    allowExtendedInterval,
  ]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!allowExtendedInterval) {
      setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleSelect = (id) => {
    const selectedRequest = unselectedRequests.find((r) => r.id === id);
    if (selectedRequest) {
      setUnselectedRequests(unselectedRequests.filter((r) => r.id !== id));
      setSelectedRequests((prev) => [
        ...prev,
        {
          ...selectedRequest,
          is_selected: true,
          sequence_number: prev.length + 1,
        },
      ]);
    }
  };

  const handleDeselect = (id) => {
    const deselectedRequest = selectedRequests.find((r) => r.id === id);
    if (deselectedRequest) {
      setSelectedRequests(
        selectedRequests
          .filter((r) => r.id !== id)
          .map((req, index) => ({
            ...req,
            sequence_number: index + 1,
          }))
      );
      setUnselectedRequests([
        ...unselectedRequests,
        { ...deselectedRequest, is_selected: false, sequence_number: null },
      ]);
    }
  };

  const handleReorder = (id, direction) => {
    setSelectedRequests((prevRequests) => {
      const index = prevRequests.findIndex((r) => r.id === id);
      if (
        index === -1 ||
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prevRequests.length - 1)
      ) {
        return prevRequests;
      }

      const newRequests = [...prevRequests];
      const [movedItem] = newRequests.splice(index, 1);
      newRequests.splice(
        direction === "up" ? index - 1 : index + 1,
        0,
        movedItem
      );
      return newRequests.map((req, idx) => ({
        ...req,
        sequence_number: idx + 1,
      }));
    });
  };

  // const toggleSelection = (id, selected) => {
  //   if (selected) {
  //     const request = requests.find((r) => r.id === id);
  //     if (request) {
  //       setRequests(requests.filter((r) => r.id !== id));
  //       setSelectedRequests([
  //         ...selectedRequests,
  //         { ...request, is_selected: true },
  //       ]);
  //     }
  //   } else {
  //     const request = selectedRequests.find((r) => r.id === id);
  //     if (request) {
  //       setSelectedRequests(selectedRequests.filter((r) => r.id !== id));
  //       setRequests([...requests, { ...request, is_selected: false }]);
  //     }
  //   }
  // };
  const getLeftTableRowStyle = (params) => {
    const { included_in_list, included_in_route } = params.data;
    if (included_in_route) {
      return { color: "red", fontWeight: "bold" }; // Маршрут червоний
    }
    if (included_in_list) {
      return { color: "blue", fontWeight: "bold" }; // Список синій
    }
    return null;
  };

  const getRowStyle = (params) => {
    const { sequence_number } = params.data;
    const maxSequence = Math.max(
      ...selectedRequests.map((req) => req.sequence_number || 0)
    );
    if (sequence_number === 1 || sequence_number === maxSequence) {
      return { border: "2px solid black", fontWeight: "bold" };
    }
    return null;
  };

  const calculateRoute = async () => {
    if (selectedRequests.length < 2) {
      alert(t("minimum_points_required"));
      return;
    }

    const origin = `${selectedRequests[0].pickup_latitude},${selectedRequests[0].pickup_longitude}`;
    const destination = `${
      selectedRequests[selectedRequests.length - 1].dropoff_latitude
    },${selectedRequests[selectedRequests.length - 1].dropoff_longitude}`;
    const waypoints = selectedRequests
      .slice(1, -1)
      .map(
        (request) => `${request.pickup_latitude},${request.pickup_longitude}`
      );

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/calculate-route/",
        {
          origin,
          destination,
          waypoints,
          language: userLanguage,
        }
      );

      const formatAddress = (address) => {
        const parts = address.split(",");
        if (parts.length >= 3) {
          const Street = parts[0].trim(); // Номер будинку та вулиця
          const house = parts[1].trim();
          const city = parts[2].trim(); // Місто
          return `${city}, ${Street}, ${house}`;
        }
        return address; // Якщо формат не відповідає очікуваному
      };

      const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60); // Цілі години
        const remainingMinutes = Math.round(minutes % 60); // Округлення хвилин
        return `${hours}h ${remainingMinutes}m`;
      };

      setRouteDetails({
        distance: Math.round(response.data.distance),
        duration: formatDuration(response.data.duration),
        stops: response.data.stops,
        passengers: selectedRequests.length,
        startAddress: formatAddress(response.data.start_address),
        endAddress: formatAddress(response.data.end_address),
      });

      alert(t("route_calculated"));
    } catch (error) {
      console.error("Error calculating route:", error);
      alert(t("error_calculating_route"));
    }
  };

  const saveList = async () => {
    if (selectedRequests.length === 0) {
      alert(t("no_requests_selected"));
      return;
    }

    const token = localStorage.getItem("access_token");

    // Формуємо параметри маршруту
    const firstRequest = selectedRequests[0];
    const lastRequest = selectedRequests[selectedRequests.length - 1];

    // 🟢 Перевіряємо та встановлюємо значення `estimated_travel_time`
    const estimatedTravelTime =
      routeDetails.duration && !isNaN(routeDetails.duration)
        ? Math.round(routeDetails.duration)
        : 0; // Якщо значення `NaN`, ставимо 0

    const requestData = {
      direction: directionFilter || "WORK_TO_HOME",
      estimated_start_time: dayjs().utc().format("YYYY-MM-DD HH:mm:ss"),
      estimated_end_time: dayjs()
        .add(1, "day")
        .utc()
        .format("YYYY-MM-DD HH:mm:ss"),
      estimated_travel_time: estimatedTravelTime, // 🟢 Виправлення NaN
      estimated_wait_time: 10,
      has_both_directions: allowMixedDirections ? 1 : 0,
      route_distance_km: Math.round(routeDetails.distance || 0),
      stop_count: selectedRequests.length - 2,
      passenger_count: selectedRequests.length,
      multiple_work_addresses_allowed:
        routeSettings?.allow_multiple_work_addresses ? 1 : 0,
      is_active: 1,
      allow_copy: 1,
      allow_edit: 1,

      start_city: firstRequest.pickup_city || "Unknown",
      start_street: firstRequest.pickup_street || "Unknown",
      start_building: firstRequest.pickup_house || "", // 🟢 Уникаємо `undefined`
      start_latitude: parseFloat(firstRequest.pickup_latitude) || 0.0,
      start_longitude: parseFloat(firstRequest.pickup_longitude) || 0.0,
      start_passenger_first_name:
        firstRequest.passenger_first_name || "Unknown",
      start_passenger_last_name: firstRequest.passenger_last_name || "Unknown",
      start_passenger_id: firstRequest.passenger || null,
      start_address_type: "pickup",
      start_coordinate_id: firstRequest.pickup_point_id || null,
      start_request_id: firstRequest.id,

      end_city: lastRequest.dropoff_city || "Unknown",
      end_street: lastRequest.dropoff_street || "Unknown",
      end_building: lastRequest.dropoff_house || "", // 🟢 Уникаємо `undefined`
      end_latitude: parseFloat(lastRequest.dropoff_latitude) || 0.0,
      end_longitude: parseFloat(lastRequest.dropoff_longitude) || 0.0,
      end_passenger_first_name: lastRequest.passenger_first_name || "Unknown",
      end_passenger_last_name: lastRequest.passenger_last_name || "Unknown",
      end_passenger_id: lastRequest.passenger || null,
      end_address_type: "dropoff",
      end_coordinate_id: lastRequest.dropoff_point_id || null,
      end_request_id: lastRequest.id,

      selected_requests: selectedRequests.map((request, index) => ({
        id: request.id,
        sequence_number: index + 1,
        pickup_latitude: request.pickup_latitude || "0.000000",
        pickup_longitude: request.pickup_longitude || "0.000000",
      })),
    };

    console.log("🔵 Відправка даних для створення списку:", requestData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ordered-passenger-list/create_ordered_list/",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Список успішно створено:", response.data);
      alert(t("list_saved"));

      // Очищуємо список після збереження
      setSelectedRequests([]);
    } catch (error) {
      console.error("❌ Помилка при збереженні списку:", error);
      alert(t("error_saving_list"));
    }
  };

  const createColumnDefs = (isLeft) => {
    // console.log("isLeft:", isLeft); // Діагностика
    const columnDefs = [
      {
        headerName: t("is_selected"),
        field: "is_selected",
        width: 50,
        cellRenderer: (params) => (
          <input
            type="checkbox"
            checked={params.value}
            onChange={() =>
              isLeft
                ? handleSelect(params.data.id)
                : handleDeselect(params.data.id)
            }
          />
        ),
      },
      {
        headerName: t("status"),
        field: "status",
        width: 80,
        cellRenderer: (params) => {
          const { sequence_number } = params.data;
          const maxSequence = Math.max(
            ...selectedRequests.map((req) => req.sequence_number || 0)
          );
          if (sequence_number === 1) return t("start");
          if (sequence_number === maxSequence) return t("finish");
          return "";
        },
      },
      {
        headerName: t("sequence_number"),
        field: "sequence_number",
        cellRenderer: (params) =>
          params.data.sequence_number && !isLeft ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => handleReorder(params.data.id, "up")}>
                ⬆️
              </button>
              <span style={{ margin: "0 10px" }}>
                {params.data.sequence_number}
              </span>
              <button onClick={() => handleReorder(params.data.id, "down")}>
                ⬇️
              </button>
            </div>
          ) : null,
        width: 120,
      },
      { headerName: t("request_id"), field: "id", width: 60 },
      {
        headerName: t("passenger_first_name"),
        field: "passenger_first_name",
        width: 70,
      },
      {
        headerName: t("passenger_last_name"),
        field: "passenger_last_name",
        width: 70,
      },

      {
        headerName: t("direction"),
        field: "direction",
        cellStyle: { fontWeight: "bold" },
        width: 120,
      },

      {
        headerName: t("departure_info"), // 🔵 Блок ВІДПРАВКА
        children: [
          {
            headerName: t("departure_time"),
            cellStyle: { fontWeight: "bold" },
            field: "departure_time",
            width: 120,
            valueFormatter: (params) =>
              params.value
                ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                : "",
          },
          {
            headerName: t("pickup_city"),
            cellStyle: { fontWeight: "bold" },
            field: "pickup_city",
            width: 70,
          },
          {
            headerName: t("pickup_street"),
            field: "pickup_street",
            width: 100,
          },
          {
            headerName: t("pickup_house"),
            field: "pickup_house",
            width: 40,
          },
          {
            headerName: t("pickup_latitude"),
            field: "pickup_latitude",
            width: 60,
          },
          {
            headerName: t("pickup_longitude"),
            field: "pickup_longitude",
            width: 60,
          },
        ],
      },

      {
        headerName: t("arrival_info"), // 🔵 Блок ПРИБУТТЯ
        children: [
          {
            headerName: t("arrival_time"),
            cellStyle: { fontWeight: "bold" },
            field: "arrival_time",
            width: 120,
            valueFormatter: (params) =>
              params.value
                ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                : "",
          },
          {
            headerName: t("dropoff_city"),
            cellStyle: { fontWeight: "bold" },
            field: "dropoff_city",
            width: 70,
          },
          {
            headerName: t("dropoff_street"),
            field: "dropoff_street",
            width: 100,
          },
          {
            headerName: t("dropoff_house"),
            field: "dropoff_house",
            width: 40,
          },
          {
            headerName: t("dropoff_latitude"),
            field: "dropoff_latitude",
            width: 70,
          },
          {
            headerName: t("dropoff_longitude"),
            field: "dropoff_longitude",
            width: 70,
          },
        ],
      },
      { headerName: t("passenger_id"), field: "passenger", width: 40 },
      {
        headerName: t("passenger_phone"),
        field: "passenger_phone",
        width: 120,
      },
      { headerName: t("is_active"), field: "is_active", width: 40 },
      { headerName: t("comment"), field: "comment", width: 600 },
    ];
    return columnDefs.filter(Boolean); // Видаляє `undefined` колонки
  };
  return (
    <div className="gltr-two-column-template">
      <div
        className="
      top-nav-bar"
      >
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
            <button onClick={fetchRequests} className="nav-button">
              {t("update_table")}
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/passenger-select")}
            >
              {t("add_request")}
            </button>

            <label>{t("search_by_name")}</label>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("enter_name_or_last_name")}
              className="form-control"
              style={{ marginBottom: "20px" }}
            />
            <div style={{ marginTop: "20px" }}>
              <label>{t("start_time")}</label>
              <input
                type="datetime-local"
                value={startDate.toISOString().slice(0, 16)}
                onChange={(e) =>
                  handleStartDateChange(new Date(e.target.value))
                }
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label>{t("end_time")}</label>
              <input
                type="datetime-local"
                value={endDate.toISOString().slice(0, 16)}
                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                className="form-control"
                disabled={!allowExtendedInterval}
              />
            </div>
            <div className="filters">
              <label>
                <input
                  type="checkbox"
                  checked={allowExtendedInterval}
                  onChange={(e) => {
                    setAllowExtendedInterval(e.target.checked);
                    if (!e.target.checked) {
                      setEndDate(
                        new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                      );
                    }
                  }}
                />
                {t("allow_extended_interval")}
              </label>
              <input
                type="checkbox"
                checked={allowMixedDirections}
                onChange={(e) => {
                  setAllowMixedDirections(e.target.checked);
                  if (!e.target.checked) {
                    setShowAllRequests(false);
                    setDirectionFilter("WORK_TO_HOME");
                  }
                }}
              />
              {t("allow_mixed_directions")}
            </div>
            <div className="filters">
              <label>
                <input
                  type="radio"
                  name="directionFilter"
                  checked={directionFilter === "WORK_TO_HOME"}
                  onChange={() => setDirectionFilter("WORK_TO_HOME")}
                />
                {t("to_home")}
              </label>
              <label>
                <input
                  type="radio"
                  name="directionFilter"
                  checked={directionFilter === "HOME_TO_WORK"}
                  onChange={() => setDirectionFilter("HOME_TO_WORK")}
                />
                {t("to_work")}
              </label>
              <label></label>
              {allowMixedDirections && (
                <label>
                  <input
                    type="radio"
                    name="directionFilter"
                    checked={directionFilter === "ALL"}
                    onChange={() => setDirectionFilter("ALL")}
                  />
                  {t("show_all_requests")}
                </label>
              )}
            </div>
            <label>
              <input
                type="checkbox"
                checked={showIncludedInList}
                onChange={(e) => setShowIncludedInList(e.target.checked)}
              />
              {t("show_included_in_list")}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showIncludedInRoute}
                onChange={(e) => setShowIncludedInRoute(e.target.checked)}
              />
              {t("show_included_in_route")}
            </label>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "50%", marginTop: "20px" }}
          >
            <AgGridReact
              key={JSON.stringify(unselectedRequests)}
              rowData={unselectedRequests}
              columnDefs={[
                {
                  headerName: t("is_selected"),
                  field: "is_selected",
                  width: 50,
                  cellRenderer: (params) => (
                    <input
                      type="checkbox"
                      checked={params.value}
                      onChange={() => handleSelect(params.data.id)}
                    />
                  ),
                },

                { headerName: t("request_id"), field: "id", width: 60 },
                {
                  headerName: t("passenger_first_name"),
                  field: "passenger_first_name",
                  width: 70,
                },
                {
                  headerName: t("passenger_last_name"),
                  field: "passenger_last_name",
                  width: 70,
                },

                {
                  headerName: t("direction"),
                  field: "direction",
                  cellStyle: { fontWeight: "bold" },
                  width: 120,
                },

                {
                  headerName: t("departure_info"), // 🔵 Блок ВІДПРАВКА
                  children: [
                    {
                      headerName: t("departure_time"),
                      cellStyle: { fontWeight: "bold" },
                      field: "departure_time",
                      width: 120,
                      valueFormatter: (params) =>
                        params.value
                          ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                          : "",
                    },
                    {
                      headerName: t("pickup_city"),
                      cellStyle: { fontWeight: "bold" },
                      field: "pickup_city",
                      width: 70,
                    },
                    {
                      headerName: t("pickup_street"),
                      field: "pickup_street",
                      width: 100,
                    },
                    {
                      headerName: t("pickup_house"),
                      field: "pickup_house",
                      width: 40,
                    },
                    {
                      headerName: t("pickup_latitude"),
                      field: "pickup_latitude",
                      width: 60,
                    },
                    {
                      headerName: t("pickup_longitude"),
                      field: "pickup_longitude",
                      width: 60,
                    },
                  ],
                },

                {
                  headerName: t("arrival_info"), // 🔵 Блок ПРИБУТТЯ
                  children: [
                    {
                      headerName: t("arrival_time"),
                      cellStyle: { fontWeight: "bold" },
                      field: "arrival_time",
                      width: 120,
                      valueFormatter: (params) =>
                        params.value
                          ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                          : "",
                    },
                    {
                      headerName: t("dropoff_city"),
                      cellStyle: { fontWeight: "bold" },
                      field: "dropoff_city",
                      width: 70,
                    },
                    {
                      headerName: t("dropoff_street"),
                      field: "dropoff_street",
                      width: 100,
                    },
                    {
                      headerName: t("dropoff_house"),
                      field: "dropoff_house",
                      width: 40,
                    },
                    {
                      headerName: t("dropoff_latitude"),
                      field: "dropoff_latitude",
                      width: 70,
                    },
                    {
                      headerName: t("dropoff_longitude"),
                      field: "dropoff_longitude",
                      width: 70,
                    },
                  ],
                },
                {
                  headerName: t("passenger_id"),
                  field: "passenger",
                  width: 40,
                },
                {
                  headerName: t("passenger_phone"),
                  field: "passenger_phone",
                  width: 120,
                },
                { headerName: t("is_active"), field: "is_active", width: 40 },
                { headerName: t("comment"), field: "comment", width: 600 },
                {
                  headerName: t("included_in_list"),
                  field: "included_in_list",
                  width: 100,
                  valueFormatter: (params) =>
                    params.value ? t("yes") : t("no"),
                },
                {
                  headerName: t("ordered_list_id"),
                  field: "ordered_list_id",
                  width: 100,
                },
                {
                  headerName: t("included_in_route"),
                  field: "included_in_route",
                  width: 100,
                  valueFormatter: (params) =>
                    params.value ? t("yes") : t("no"),
                },
                { headerName: t("route_id"), field: "route_id", width: 100 },
              ]}
              getRowStyle={getLeftTableRowStyle} // ✅ Тільки для лівої таблиці
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="gltr-template2s-right-column">
          <div className="gltr-template2s-upper-right">
            <h2>{t("selected_passengers")}</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "50%", marginTop: "20px" }}
            >
              <AgGridReact
                key={JSON.stringify(selectedRequests)}
                rowData={selectedRequests}
                columnDefs={createColumnDefs(false)}
                getRowStyle={getRowStyle}
                pagination
                paginationPageSize={10}
              />
            </div>
          </div>
          <div className="gltr-template2s-lower-right">
            <h1>{t("route_summary")}</h1>
            {routeDetails.distance !== null ? (
              <h3>
                {t("direction")}: {routeDetails.startAddress} →{" "}
                {routeDetails.endAddress} <strong>&#8226;</strong>{" "}
                {t("distance")}: {routeDetails.distance} km{" "}
                <strong>&#8226;</strong> {t("estimated_time")}:{" "}
                {routeDetails.duration} <strong>&#8226;</strong>{" "}
                {t("stop_count")}: {routeDetails.stops} <strong>&#8226;</strong>{" "}
                {t("passenger_count")}: {routeDetails.passengers}
              </h3>
            ) : (
              <p>{t("no_route_data")}</p>
            )}
            <div className="route-buttons">
              <button className="nav-button" onClick={calculateRoute}>
                {t("calculate_route")}
              </button>
              <button className="nav-button" onClick={saveList}>
                {t("save_list")}
              </button>
            </div>
            <div>
              {routeSettings && (
                <div className="route-settings-summary">
                  <h3>{t("configured_route_limits")}:</h3>
                  <p>
                    {t("date_interval")}: {routeSettings.date_interval}{" "}
                    {t("days")} <strong>&#8226;</strong>{" "}
                    {t("arrival_time_tolerance")}:{" "}
                    {routeSettings.arrival_time_tolerance} {t("minutes")}{" "}
                    <strong>&#8226;</strong> {t("allow_mixed_directions")}:{" "}
                    {routeSettings.allow_mixed_directions ? t("yes") : t("no")}{" "}
                    <strong>&#8226;</strong> {t("max_route_duration")}:{" "}
                    {routeSettings.max_route_duration} {t("minutes")}{" "}
                    <strong>&#8226;</strong> {t("max_route_distance")}:{" "}
                    {routeSettings.max_route_distance} {t("km")}{" "}
                    <strong>&#8226;</strong> {t("max_stops")}:{" "}
                    {routeSettings.max_stops} <strong>&#8226;</strong>{" "}
                    {t("max_passengers")}: {routeSettings.max_passengers}{" "}
                    <strong>&#8226;</strong> {t("min_passengers")}:{" "}
                    {routeSettings.min_passengers} <strong>&#8226;</strong>{" "}
                    {t("allow_multiple_work_addresses")}:{" "}
                    {routeSettings.allow_multiple_work_addresses
                      ? t("yes")
                      : t("no")}
                  </p>
                </div>
              )}
              <div>
                <button
                  className="nav-button"
                  onClick={() => navigate("/user-routes-settings")}
                >
                  {t("user_routes_settings")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupingListToRoute;
