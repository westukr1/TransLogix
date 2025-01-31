import React, { useState, useEffect } from "react";
import "./OrderedPassengerList.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import dayjs from "dayjs";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const OrderedPassengerList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  // Встановлення значень дат за замовчуванням: завтра початок і кінець доби
  const tomorrow = dayjs().add(1, "day").startOf("day");
  const endOfTomorrow = tomorrow.endOf("day");

  const [passengerLists, setPassengerLists] = useState([]);

  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчува
  const [filters, setFilters] = useState({
    direction: "",
    is_active: "",
    start_city: "",
    start_date: tomorrow.format("YYYY-MM-DD HH:mm:ss"),
    end_date: endOfTomorrow.format("YYYY-MM-DD HH:mm:ss"),
    search_query: "",
  });

  useEffect(() => {
    console.log("Відправка запиту з фільтрами:", filters);
    const token = localStorage.getItem("access_token");
    // const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    // const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");
    const formattedFilters = {
      direction: filters.direction,
      is_active: filters.is_active,
      start_city__icontains: filters.start_city,
      estimated_start_time__gte: filters.start_date, // відповідність бекенду
      estimated_end_time__lte: filters.end_date, // відповідність бекенду
      search_query: filters.search_query,
    };
    if (filters.search_query) {
      formattedFilters.start_passenger_last_name__icontains =
        filters.search_query;
      formattedFilters.end_passenger_last_name__icontains =
        filters.search_query;
    }
    console.log("Форматовані фільтри перед запитом:", formattedFilters);
    axios
      .get("http://127.0.0.1:8000/api/ordered-passenger-list/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: formattedFilters,
      })
      .then((response) => {
        console.log("Отримані дані:", response.data);
        setPassengerLists(response.data);
      })
      .catch((error) => {
        console.error("Помилка при отриманні списків пасажирів:", error);
      });
  }, [filters]);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    let updatedFilters = { ...filters };

    if (name === "start_date" || name === "end_date") {
      const formattedDate = value
        ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
        : "";
      updatedFilters[name] = formattedDate;

      if (
        name === "start_date" &&
        dayjs(formattedDate).isAfter(dayjs(filters.end_date))
      ) {
        updatedFilters.end_date = dayjs(formattedDate)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
      }

      if (
        name === "end_date" &&
        dayjs(formattedDate).isBefore(dayjs(filters.start_date))
      ) {
        updatedFilters.start_date = dayjs(formattedDate)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
      }
    } else {
      updatedFilters[name] = value;
    }

    console.log("Оновлені фільтри (форматовані дати):", updatedFilters);
    setFilters(updatedFilters);
  };

  const handleDateChange = (name, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: formattedDate,
    }));
    console.log(`Оновлено ${name}:`, formattedDate);
  };

  const columnDefs = [
    { headerName: t("ID"), field: "id", width: 40 },
    { headerName: t("direction"), field: "direction", width: 120 },
    {
      headerName: t("estimated_start_time"),
      field: "estimated_start_time",
      width: 120,
      valueFormatter: (params) =>
        dayjs(params.value).format("YYYY-MM-DD HH:mm"),
    },
    {
      headerName: t("End Time"),
      field: "estimated_end_time",
      width: 120,
      valueFormatter: (params) =>
        dayjs(params.value).format("YYYY-MM-DD HH:mm"),
    },
    {
      headerName: t("start_of_route"),
      children: [
        { headerName: t("start_city"), field: "start_city", width: 100 },
        { headerName: t("start_street"), field: "start_street", width: 120 },
        { headerName: t("start_building"), field: "start_building", width: 50 },
        { headerName: t("start_latitude"), field: "start_latitude", width: 70 },
        {
          headerName: t("start_longitude"),
          field: "start_longitude",
          width: 70,
        },
        {
          headerName: t("start_passenger_first_name"),
          field: "start_passenger_first_name",
          width: 70,
        },
        {
          headerName: t("start_passenger_last_name"),
          field: "start_passenger_last_name",
          width: 70,
        },
        {
          headerName: t("start_passenger_id"),
          field: "start_passenger_id",
          width: 40,
        },
        {
          headerName: t("start_address_type"),
          field: "start_address_type",
          width: 40,
        },
        {
          headerName: t("start_coordinate_id"),
          field: "start_coordinate_id",
          width: 60,
        },
        {
          headerName: t("start_request_id"),
          field: "start_request_id",
          width: 60,
        },
      ],
    },
    {
      headerName: t("end_of_route"),
      children: [
        { headerName: t("end_city"), field: "end_city", width: 100 },
        { headerName: t("end_street"), field: "end_street", width: 120 },
        { headerName: t("end_building"), field: "end_building", width: 40 },
        { headerName: t("end_latitude"), field: "end_latitude", width: 70 },
        { headerName: t("end_longitude"), field: "end_longitude", width: 70 },
        {
          headerName: t("end_passenger_first_name"),
          field: "end_passenger_first_name",
          width: 100,
        },
        {
          headerName: t("end_passenger_last_name"),
          field: "end_passenger_last_name",
          width: 100,
        },
        {
          headerName: t("end_passenger_id"),
          field: "end_passenger_id",
          width: 40,
        },
        {
          headerName: t("end_address_type"),
          field: "end_address_type",
          width: 60,
        },
        {
          headerName: t("end_coordinate_id"),
          field: "end_coordinate_id",
          width: 60,
        },
        { headerName: t("end_request_id"), field: "end_request_id", width: 60 },
      ],
    },

    {
      headerName: t("estimated_travel_time"),
      field: "estimated_travel_time",
      width: 100,
    },
    {
      headerName: t("estimated_wait_time"),
      field: "estimated_wait_time",
      width: 100,
    },
    {
      headerName: t("has_both_directionss"),
      field: "has_both_directions",
      width: 100,
    },
    {
      headerName: t("route_distance_km"),
      field: "route_distance_km",
      width: 100,
    },
    { headerName: t("stop_count"), field: "stop_count", width: 50 },
    { headerName: t("Passenger Count"), field: "passenger_count", width: 50 },
    {
      headerName: t("multiple_work_addresses_allowed"),
      field: "multiple_work_addresses_allowed",
      width: 50,
    },
    { headerName: t("is_active"), field: "is_active", width: 100 },
    // { headerName: t("allow_copy"), field: "allow_copy", width: 50 },
    // { headerName: t("allow_edit"), field: "allow_edit", width: 50 },
    // { headerName: t("created_at"), field: "created_at", width: 100 },
    // { headerName: t("updated_at"), field: "updated_at", width: 100 },
    // { headerName: t("deactivated_at"), field: "deactivated_at", width: 100 },
    {
      headerName: t("assigned_route_id_id"),
      field: "assigned_route_id_id",
      width: 100,
    },
  ];

  return (
    <div className="opl-two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <h1 className="header-title">{t("ordered_passenger_list")}</h1>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={() => navigate(-1)}>
            {t("nav.back")}
          </button>
        </div>
      </div>
      <div className="opl-template2s-content">
        <div className="opl-top-field">
          <p>{t("ordered_passenger_list")}</p>
          <div className="filter-container">
            <label>
              {t("start_date")}:
              <input
                type="datetime-local"
                name="start_date"
                value={
                  filters.start_date
                    ? dayjs(filters.start_date).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleFilterChange}
              />
            </label>

            <label>
              {t("end_date")}:
              <input
                type="datetime-local"
                name="end_date"
                value={
                  filters.end_date
                    ? dayjs(filters.end_date).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleFilterChange}
              />
            </label>
            <label>
              {t("direction")}:
              <select name="direction" onChange={handleFilterChange}>
                <option value="">{t("all")}</option>
                <option value="HOME_TO_WORK">{t("home_to_work")}</option>
                <option value="WORK_TO_HOME">{t("work_to_home")}</option>
              </select>
            </label>
            <label>
              {t("is_active")}:
              <select name="is_active" onChange={handleFilterChange}>
                <option value="">{t("all")}</option>
                <option value="true">{t("active")}</option>
                <option value="false">{t("inactive")}</option>
              </select>
            </label>
            <label>{t("search_by_name")}</label>

            <label>
              {t("search_query")}:
              <input
                type="text"
                name="search_query"
                placeholder={t("enter_name_or_last_name")}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              {t("start_city")}:
              <input
                type="text"
                name="start_city"
                onChange={handleFilterChange}
              />
            </label>
          </div>

          <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              rowData={passengerLists}
              columnDefs={columnDefs.map((col) => ({
                ...col,
                headerClass: "wrap-header",
                cellStyle: { wordBreak: "break-word", whiteSpace: "normal" },
              }))}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        </div>
        <div className="opl-bottom-field">
          <p>{t("opl-top-field_content")}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderedPassengerList;
